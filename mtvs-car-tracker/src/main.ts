import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import RABBITMQ_URL from './configs/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'car_location_updates',
      queueOptions: { durable: true },
    }
  }) ;
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'traffic_lights_color_updates',
      queueOptions: { durable: true },
    }
  }) ;
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'congestion_traffic_queue',
      queueOptions: { durable: false },
      exchange: 'congestion_traffic_exchange',
      exchangeType: 'fanout'
    }
  }) ;
  app.startAllMicroservices() ;
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
