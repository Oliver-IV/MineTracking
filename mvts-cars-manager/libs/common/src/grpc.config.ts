import 'dotenv/config';

const GRPC_URL= process.env.GRPC_URL || 'cars-manager:5000';

export { GRPC_URL };