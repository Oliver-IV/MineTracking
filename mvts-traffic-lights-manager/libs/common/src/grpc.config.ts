import 'dotenv/config';

const GRPC_URL= process.env.GRPC_URL || 'traffic-lights-manager:5000';

export { GRPC_URL };