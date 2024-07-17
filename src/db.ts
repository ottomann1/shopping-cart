import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
// Create a new PostgreSQL client
const client = postgres({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'postgres',
  ssl: false, // Disable SSL if not using SSL
});

// Initialize Drizzle ORM with the connected client
const db = drizzle(client);

export default db;