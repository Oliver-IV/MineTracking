import "dotenv/config" ;

const GRPC_URL = process.env.GRPC_URL || 'localhost:5005';

export { GRPC_URL } ;