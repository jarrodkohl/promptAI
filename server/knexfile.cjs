const path = require("path");
const getDatabaseUrl = require("./src/config/getDatabaseUrl.cjs");

const migrationPath = "src/db/migrations";

module.exports = {
  // connection: process.env.DATABASE_URL, // getDatabaseUrl(process.env.NODE_ENV),
  connection: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  client: "pg",
  migrations: {
    directory: migrationPath,
    extension: "cjs",
    stub: path.join(migrationPath, "migration.stub.cjs"),
  },
};
