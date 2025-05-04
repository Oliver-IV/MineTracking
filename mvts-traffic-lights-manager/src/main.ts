import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TRAFFIC_LIGHTS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../traffic-lights.proto'),
        package: [TRAFFIC_LIGHTS_PACKAGE_NAME,],
        url: 'localhost:5000'
      }
    }
  )
  await app.listen();
}
bootstrap();
