import "dotenv/config"

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://user:password@rmq:5672" ;

export default RABBITMQ_URL ;