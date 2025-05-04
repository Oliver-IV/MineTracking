import "dotenv/config"

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost" ;

export default RABBITMQ_URL ;