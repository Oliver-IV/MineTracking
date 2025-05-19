import 'dotenv/config';

export const CARS_SERVICE='cars';
export const CARS_SERVICE_URL= process.env.CARS_SERVICE_URL || 'cars-manager:5000';
export const TRAFFIC_LIGHTS_SERVICE='trafficLights';
export const TRAFFIC_LIGHTS_SERVICE_URL= process.env.TRAFFIC_LIGHTS_SERVICE_URL || 'traffic-lights-manager:5000';
