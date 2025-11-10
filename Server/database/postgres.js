import pg from 'pg'

const {Client} = pg


/* Connection to out databaase (SupaBase)
 * 
 * Theese Creds should not be stored in plain text, 
 * But for an edeucational project we feel it is ok
*/
const client = new Client({
  host: "db.vqoczgjsfpzmdunhglyo.supabase.co",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "xykbic-gIcza6-haxsag",
  ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

client.connect()
  .then(() => console.log("Connected to Supabase!"))
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
