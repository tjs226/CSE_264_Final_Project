import express from 'express'
import { query } from './database/postgres.js'

// set up the app 
const app = express()
const port = 3000


/* Routes Go Here */

// make home route
app.get('/', (request, response) => {
    response.send("Bethlehem Events API")
});


// GET route to return all events
app.get('/events', async (request, response) =>  {
    const sql = "SELECT * FROM tta_events";

    try {
        const data = await query(sql, []);
        response.json(data.rows);
    } catch (err) {
        console.log(err);
        response.status(500).json({error: "Internal Server Error"})
    }
})




// run the app
app.listen(port, async () => {
    console.log(`The Server is Running at http://localhost:${port}`)
})

