import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TRAFFIC_LIGHTS_PACKAGE_NAME } from '@app/common';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';


async function bootstrap() {

  const certOptions = {
    key: fs.readFileSync('certs/server.key.decrypted'),
    cert: fs.readFileSync('certs/server.crt'),
  };


  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../traffic-lights.proto'),
        package: [TRAFFIC_LIGHTS_PACKAGE_NAME],
        url: 'localhost:5000',
        credentials: grpc.ServerCredentials.createSsl(
          null,
          [{
            private_key: certOptions.key,
            cert_chain: certOptions.cert,
          }],
          false
        )
      },
    },
  );
  await app.listen();
}
bootstrap();
