import pg from 'pg'

const {Client} = pg


/* Connection to out databaase (SupaBase)
 * 
 * Theese Creds should not be stored in plain text, 
 * But for an edeucational project we feel it is ok
*/
const client = new Client({
  connectionString: "postgresql://postgres:wyzzif-xawmI9-tafwos@db.whywhklbcrimotlipfpf.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false }
});

client.connect()


export const query = async (text, values) => {
    try{
        console.log("query to be executed: " + text)
        const res = await client.query(text, values)
        return res

    } catch (err) {
        console.log(err)
    }
}
