import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

/*database connection with a connection pool
*/
const CONCURRENT_CONNECTIONS = 2;
let connectionPool;
if (Deno.env.get("postgres://xfjqxwwj:I6I229x0F1giLJ9zcXKa7cBYewxjBGdb@mouse.db.elephantsql.com/xfjqxwwj")) {
  connectionPool = new Pool(Deno.env.get("postgres://xfjqxwwj:I6I229x0F1giLJ9zcXKa7cBYewxjBGdb@mouse.db.elephantsql.com/xfjqxwwj"), CONCURRENT_CONNECTIONS);
} else {
  connectionPool = new Pool({
    hostname: "abul.db.elephantsql.com",
    database: "azfwpsim",
    user: "azfwpsim",
    password: "hQjrUnEmJTzZKEIBKXyyoDgrzst2KkiQ",
    port: 5432,
  }, CONCURRENT_CONNECTIONS);
}
/*Execute query with error catching.
*/
  const executeQuery = async (query, params) => {
    const response = {};
    let client; 
    try {
        client = await connectionPool.connect();
        const result = await client.queryObject(query, params);
        if (result && result.rows){
            response.rows = result.rows;
        }
    } catch (e) {
        response.error = e;
    } finally {
        if(client) {
            try {
                await client.release();
            } catch (e) {
                console.log("Unable to release database connection.")
                console.log(e);
            }
        }
    }
    return response;
};

export { executeQuery };