import "dotenv/config" ;

const GRPC_URL = process.env.GRPC_URL || 'auth:5000';

export { GRPC_URL } ;