import "dotenv/config";

const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const carQueueName = process.env.CAR_QUEUE_NAME || 'car_location_updates';
const trafficLightQueueName = process.env.TRAFFIC_LIGHT_QUEUE_NAME || 'traffic_lights_color_updates';

export { rabbitMqUrl, carQueueName, trafficLightQueueName };