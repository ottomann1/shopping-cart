import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "postgres",
    ssl: false,
  },
  schema: "./src/schema.ts",
  out: "./drizzle",
});
