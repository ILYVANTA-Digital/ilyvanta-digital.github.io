import fs from "node:fs/promises";
import postgres from "postgres";
if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL in the server environment first.");
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
try {
  await sql.begin(async (tx) => {
    await tx.unsafe(await fs.readFile(new URL("../db/001_leads.sql", import.meta.url), "utf8"));
  });
  console.log("Contact database migration applied.");
} finally {
  await sql.end();
}
