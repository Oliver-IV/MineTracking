import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CarsModule } from './cars/cars.module';
import { join } from 'path';
import { CARS_PACKAGE_NAME } from '@app/common';
import { TRAFFIC_LIGHTS_PACKAGE_NAME } from '@app/common/types/trafficLights';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: [join(__dirname, '../cars.proto'), join(__dirname, '../trafficLights.proto')],
        package: [CARS_PACKAGE_NAME,TRAFFIC_LIGHTS_PACKAGE_NAME]
      }
    }
  )
  await app.listen();
}
bootstrap();
