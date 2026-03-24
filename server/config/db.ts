import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// pg uses a connection string OR individual fields.
// Render provides a DATABASE_URL string — we support both.
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // required for Render PostgreSQL
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5432,
      }
);

export default pool;