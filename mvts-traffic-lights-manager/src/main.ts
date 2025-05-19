import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TRAFFIC_LIGHTS_PACKAGE_NAME, GRPC_URL } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../traffic-lights.proto'),
        package: [TRAFFIC_LIGHTS_PACKAGE_NAME],
        url: GRPC_URL,
      },
    },
  );
  await app.listen();
}
bootstrap();
