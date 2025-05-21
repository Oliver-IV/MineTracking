import "dotenv/config" ;

const CERT_PASS = process.env.CERT_PASS ;
const REPORTS_RQM_URL = process.env.REPORTS_RQM_URL || "amqp://user:password@rmq:5672";
const CARS_MANAGER_SERVICE_URL = process.env.CARS_MANAGER_SERVICE_URL || "cars-manager:5000";
const CONGESTION_SERVICE_URL = process.env.CONGESTION_SERVICE_URL || "congestion:5000";
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "auth:5000";
const SHIPMENTS_SERVICE_URL = process.env.SHIPMENTS_SERVICE_URL || "shipment:8080";
const TRAFFIC_LIGHTS_URL = process.env.TRAFFIC_LIGHTS_URL || "traffic-lights-manager:5000";
const ROUTES_SERVICE_URL = process.env.ROUTES_SERVICE_URL || "routes-manager:5000";

export { CERT_PASS, CARS_MANAGER_SERVICE_URL, CONGESTION_SERVICE_URL, AUTH_SERVICE_URL, REPORTS_RQM_URL, SHIPMENTS_SERVICE_URL, TRAFFIC_LIGHTS_URL, ROUTES_SERVICE_URL } ;