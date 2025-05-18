import "dotenv/config" ;

const GRPC_URL = process.env.GRPC_URL || 'localhost:5006';

export { GRPC_URL } ;