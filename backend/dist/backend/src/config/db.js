import pg from 'pg';
console.log('db file loaded');
const { Pool } = pg;
const DB_USER = String(process.env.DB_USER);
const DB_HOST = String(process.env.DB_HOST);
const DB_PASSWORD = String(process.env.DB_PASSWORD);
const DB_NAME = String(process.env.DB_NAME);
const DB_PORT = Number(process.env.DB_PORT);
export const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
});
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
    }
    else {
        console.log('✅ Database connected successfully at:', res.rows[0].now);
    }
});
console.log('Database connected after.');
//# sourceMappingURL=db.js.map