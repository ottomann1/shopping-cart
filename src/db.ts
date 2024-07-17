import { Client } from "pg";
import { drizzle } from "drizzle-orm";
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "postgres",
  ssl: false, // Disable SSL
});
client.connect();
const db = drizzle(client);
export default db;
