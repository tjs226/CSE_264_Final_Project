import pg from 'pg'

const {Client} = pg


/* Connection to out databaase (SupaBase)
 * 
 * Theese Creds should not be stored in plain text, 
 * But for an edeucational project we feel it is ok
*/
const client = new Client({
  host: "cse264.cru8ico68j35.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "cse264",
  user: "tta",
  password: "tta_lehigh",
  ssl: {
    rejectUnauthorized: false
  }
})


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
