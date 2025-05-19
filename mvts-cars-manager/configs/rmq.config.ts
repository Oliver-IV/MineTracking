import "dotenv/config";
export const RMQ_CLIENT_NAME= process.env.RMQ_CLIENT_NAME ? process.env.RMQ_CLIENT_NAME : 'TRAFFIC_LIGHTS_SERVICE';
export const RMQ_URI = process.env.RMQ_URI ? process.env.RMQ_URI : 'amqp://user:password@rmq:5672';
export const RMQ_QUEUE_NAME = process.env.RMQ_QUEUE_NAME ? process.env.RMQ_QUEUE_NAME : 'traffic_lights_queue';
export enum PATTERNS{
    TRAFFIC_LIGHT_CREATED='traffic-light-created',
    TRAFFIC_LIGHT_DELETED='traffic-light-deleted',
    TRAFFIC_LIGHT_UPDATED='traffic-light-updated',
    TRAFFIC_LIGHT_STATE_CHANGED='traffic-light-state-changed',
}