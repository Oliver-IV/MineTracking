import "dotenv/config";

const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const carQueueName = process.env.CAR_QUEUE_NAME || 'car_location_updates';
const routeStartedQueue = process.env.ROUTE_STARTED_QUEUE_NAME || 'route_started_queue';
const trafficLightQueueName = process.env.TRAFFIC_LIGHT_QUEUE_NAME || 'traffic_lights_color_updates_queue';
const trafficLightChangeQueueName = process.env.TRAFFIC_LIGHT_CHANGE_QUEUE_NAME || 'traffic_light_color_change_queue'

export { rabbitMqUrl, carQueueName, trafficLightQueueName, trafficLightChangeQueueName, routeStartedQueue };