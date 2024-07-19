"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
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
