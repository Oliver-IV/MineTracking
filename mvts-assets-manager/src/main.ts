import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CarsModule } from './cars/cars.module';
import { join } from 'path';
import { CARS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CarsModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../cars.proto'),
        package: CARS
      }
    }
  )
  await app.listen();
}
bootstrap();
