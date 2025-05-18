import "dotenv/config" ;


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER !== undefined && process.env.DB_USER === 'postgres' ?  process.env.DB_USER : 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_NAME = process.env.DB_NAME || 'postgres';

export { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME };