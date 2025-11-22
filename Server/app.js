import 'dotenv/config'
import express from 'express'
import { query } from './database/postgres.js'
import cors from 'cors';
import crypto from 'crypto'
import cookieParser from 'cookie-parser'
import { generateToken, requireRouteAuth, extractToken, validateToken } from './auth/auth.js'

// Generate a random salt
export function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

// Hash a password with a salt
export function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// set up the app 
const app = express()
const port = 3000

app.use(cookieParser())
app.use(cors());
app.use(express.json()) 

/* Routes Go Here */

// make home route
app.get('/', (request, response) => {
    response.send("Bethlehem Events API")
});


// POST: /events - Creates a new event, Requires an authorized user, Event owner is the requester (get this from cookie with token)
app.post('/events', requireRouteAuth, async (request, response) => {
    const { name, date, start_time, end_time, location, description } = request.body    
    if (!name || !date || !start_time || !end_time || !location) {
        return response.status(400).json({ error: "Missing required fields: name, date, start_time, end_time, location" })
    }
    const userId = request.user 

    try {
        const sql = `INSERT INTO tta_events (owner, name, date, start_time, end_time, location, description, rsvp_amount) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, 0) RETURNING *`
        const data = await query(sql, [userId, name, date, start_time, end_time, location, description])
        
        response.status(201).json(data.rows[0])
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// GET: /events route - Return all events
app.get('/events', async (request, response) => {
    try {
        const sql = `SELECT * FROM tta_events`;
        const data = await query(sql, []);
        
        response.json(data.rows);
    } catch (err) {
        console.log(err);
        response.status(500).json({error: "Internal Server Error"})
    }
})

// GET: /events/:id - Return an event with the given id
app.get('/events/:id', async (request, response) => {
    const { id } = request.params

    try {
        const sql = `SELECT * FROM tta_events WHERE id = $1`
        const data = await query(sql, [id])
        
        if (data.rows.length === 0) {
            return response.status(404).json({ error: "Event not found" })
        }
        
        response.json(data.rows[0])
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// PUT: /events/:id/rsvp - Increment the rsvp counter for a given event 
app.put('/events/:id/rsvp', async (request, response) => {
    const { id } = request.params

    try {
        const sql = `UPDATE tta_events SET rsvp_amount = rsvp_amount + 1 WHERE id = $1 RETURNING *`
        const data = await query(sql, [id])
        
        if (data.rows.length === 0) {
            return response.status(404).json({ error: "Event not found" })
        }
        
        response.json(data.rows[0])
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// POST: /auth/user/add - Adds a new user to the system, Passes email and password as request body 
app.post('/auth/user/add', async (request, response) => {
    const { first_name, last_name, email, password } = request.body
    if (!email || !password) {
        return response.status(400).json({ error: "Email and password are required" })
    }
    
    try {
        // Find if user already exists
        const checkSql = `SELECT id FROM tta_users WHERE email = $1`
        const existingUser = await query(checkSql, [email])
        
        if (existingUser.rows.length > 0) {
            return response.status(409).json({ error: "User already exists" })
        }
        
        // Generate salt and hash password
        const salt = generateSalt()
        const hashedPassword = hashPassword(password, salt)

        // Insert new user
        const sql = `INSERT INTO tta_users (first_name, last_name, email, hashed_password, salt) 
                     VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email`
        const data = await query(sql, [first_name, last_name, email, hashedPassword, salt])
        
        response.status(201).json(data.rows[0])
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// POST: /auth/login - Logs a user into the system, Checks if they exist in the database, Sets there session cookie with a token for 1 hour
app.post('/auth/login', async (request, response) => {
    const { email, password } = request.body
    if (!email || !password) {
        return response.status(400).json({ error: "Email and password are required" })
    }
    
    try {
        // Find user by email to see if the user exists in the system
        const sql = `SELECT id, email, hashed_password, salt FROM tta_users WHERE email = $1`
        const data = await query(sql, [email])
        
        if (data.rows.length === 0) {
            return response.status(401).json({ error: "Invalid email" })
        }
        const user = data.rows[0]
        
        // Hash the provided password with the stored salt
        const hashedInputPassword = hashPassword(password, user.salt)
        
        // Compare hashed passwords
        if (hashedInputPassword !== user.hashed_password) {
            return response.status(401).json({ error: "Invalid password" })
        }
        
        const token = generateToken(user.id) // Generate a JWT token for that user
        
        // Cookies should be set with a generated token using a secret key 
        response.cookie("token", token, {
            maxAge: 3600000, // 1 hour in milliseconds
            httpOnly: false, // The cookie must be accessible by the browser (NOT AN HTTP ONLY COOKIE)
            secure: false, 
            sameSite: "lax",
        })
        
        // Return success with token
        response.status(200).json({ 
            message: "Login successful",
            token: token,
            userId: user.id
        })
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// POST: /auth/logout - Logs a user out of the system, Requires an authorized user, Removes there cookie with token
app.post('/auth/logout', requireRouteAuth, (request, response) => {
    try {
        response.clearCookie('token') // redirectToLogin(response)
        response.status(200).json({ message: "Logout successful" })
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// GET: /auth/user/current - Get the current information of user logged in, Requires an authorized user 
app.get('/auth/user/current', requireRouteAuth, async (request, response) => {
    const userId = request.user
    
    try {
        const sql = `SELECT * FROM tta_users WHERE id = $1`
        const data = await query(sql, [userId])
        
        if (data.rows.length === 0) {
            return response.status(404).json({ error: "User not found" })
        }
        
        response.json(data.rows[0])
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// GET: /user/events - Return the events belonging to the user currently logged in, Requires an authorized user 
app.get('/user/events', requireRouteAuth, async (request, response) => {
    const userId = request.user
    
    try {
        const sql = `SELECT * FROM tta_events WHERE id = $1`
        const data = await query(sql, [userId])
        
        response.json(data.rows)
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// PUT: /user/events/:id - Updates an Event, Requires an authorized user, Can only be made by Event Owner
app.put('/user/events/:id', requireRouteAuth, async (request, response) => {
    const { id } = request.params
    const { name, date, start_time, end_time, location, description } = request.body    
    const userId = request.user 

    try {
        // Check if the event exists and belongs to the user
        const checkSql = `SELECT * FROM tta_events WHERE id = $1 AND owner = $2`
        const existingEvent = await query(checkSql, [id, userId])
        
        if (existingEvent.rows.length === 0) {
            return response.status(404).json({ error: "Event not found or you do not have permission to edit this event" })
        }

        // Update the event
        const sql = `UPDATE tta_events 
                     SET name = $1, date = $2, start_time = $3, end_time = $4, location = $5, description = $6
                     WHERE id = $7 RETURNING *`
        const data = await query(sql, [name, date, start_time, end_time, location, description, id])
        
        response.json(data.rows[0])
    } catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal Server Error" })
    }
})

// DELETE: /user/:id - Deletes an Event, Requires an authorized user, Can only be made by Event Owner


// run the app
app.listen(port, async () => {
    console.log(`The Server is Running at http://localhost:${port}`)
})
