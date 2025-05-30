import "dotenv/config" ;

const CERT_PASS = process.env.CERT_PASS ;
const REPORTS_RQM_URL = process.env.REPORTS_RQM_URL || "amqp://localhost:5672";
const CARS_MANAGER_SERVICE_URL = process.env.CARS_MANAGER_SERVICE_URL || "cars-manager:5000";
const CONGESTION_SERVICE_URL = process.env.CONGESTION_SERVICE_URL || "localhost:5002";
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "auth:5000";
const SHIPMENTS_SERVICE_URL = process.env.SHIPMENTS_SERVICE_URL || "localhost:5299";
const TRAFFIC_LIGHTS_URL = process.env.TRAFFIC_LIGHTSE_URL || "traffic-lights-manager:5000";
const ROUTES_SERVICE_URL = process.env.ROUTES_SERVICE_URL || "localhost:5006";

export { CERT_PASS, CARS_MANAGER_SERVICE_URL, CONGESTION_SERVICE_URL, AUTH_SERVICE_URL, REPORTS_RQM_URL, SHIPMENTS_SERVICE_URL, TRAFFIC_LIGHTS_URL, ROUTES_SERVICE_URL } ;