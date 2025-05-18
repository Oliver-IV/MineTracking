import 'dotenv/config';

export const RMQ_CLIENT_NAME = process.env.RMQ_CLIENT_NAME
  ? process.env.RMQ_CLIENT_NAME
  : 'TRAFFIC_LIGHTS_SERVICE';
export const RMQ_URI = process.env.RMQ_URI
  ? process.env.RMQ_URI
  : 'amqp://localhost:5672';
export const RMQ_QUEUE_NAME = process.env.RMQ_QUEUE_NAME
  ? process.env.RMQ_QUEUE_NAME
  : 'traffic_lights_queue';
export const TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE = process.env.TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE
  ? process.env.TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE
  : 'traffic_light_color_change_queue';

export enum PATTERNS {
  TRAFFIC_LIGHT_CREATED = 'traffic-light-created',
  TRAFFIC_LIGHT_DELETED = 'traffic-light-deleted',
  TRAFFIC_LIGHT_UPDATED = 'traffic-light-updated',
  TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE = 'traffic-light-state-changed',
}
//traffic_light_color_change_queue
