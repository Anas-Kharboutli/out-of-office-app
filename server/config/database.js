import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_name
}).promise();

export default db;

