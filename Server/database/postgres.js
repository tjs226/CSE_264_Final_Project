/* Load System Env Variables */
import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg'

const {Client} = pg


/* Connection to databaase */
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { 
    rejectUnauthorized: false 
  }
});


client.connect()
  .then(() => console.log("Connected to Database!"))
  .catch(err => console.error("Connection error:", err));





export const query = async (text, values) => {
    try{
        console.log("query to be executed: " + text)
        const res = await client.query(text, values)
        return res

    } catch (err) {
        console.log(err)
    }
}
