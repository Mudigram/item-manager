import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// A pool keeps several connections alive and reuses them.
// Much more efficient than opening/closing a connection per request.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;