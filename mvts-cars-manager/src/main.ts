import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CARS_PACKAGE_NAME, GRPC_URL } from '@app/common';
import { RMQ_QUEUE_NAME, RMQ_URI } from 'configs/rmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
          urls: [RMQ_URI],
          queue: RMQ_QUEUE_NAME,
          noAck:false,
          persistent: true
        }
    }
  );
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../cars.proto'),
        package: [CARS_PACKAGE_NAME,],
        url: GRPC_URL
      }
    }
  );
  await app.startAllMicroservices();
}
bootstrap();
