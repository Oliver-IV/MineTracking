import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import RABBITMQ_URL from './configs/rabbitmq.config';
import { CustomRmqDeserializer } from 'utils/custom-rmq.deserializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const deserializer = new CustomRmqDeserializer();
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'car_location_updates_queue',
      queueOptions: { durable: true },
      deserializer
    },
  }) ;
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'traffic_lights_color_updates',
      queueOptions: { durable: true },
      deserializer
    }
  }) ;
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'congestion_traffic_queue',
      queueOptions: { durable: false },
      deserializer,
      exchange: 'congestion_traffic_exchange',
      exchangeType: 'fanout'
    }
  }) ;
  app.startAllMicroservices() ;
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
