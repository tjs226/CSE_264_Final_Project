import express from 'express'
import { query } from './database/postgres.js'

// set up the app 
const app = express()
const port = 3000


/* Routes Go Here */

// make home route
app.get('/', (request, response) => {
    response.send("Bethlehem Events API")
})




// run the app
app.listen(port, async () => {
    console.log(`The Server is Running at http://localhost:${port}`)
})

