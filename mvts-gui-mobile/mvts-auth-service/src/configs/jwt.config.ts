import "dotenv/config" ;

const JWT_KEY = process.env.JWT_KEY || '';

export { JWT_KEY };