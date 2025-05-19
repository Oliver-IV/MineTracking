import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CARS_PACKAGE_NAME, GRPC_URL } from '@app/common';
import { RMQ_QUEUE_NAME, RMQ_URI } from 'configs/rmq.config';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const certOptions = {
    key: fs.readFileSync('certs/server.key.decrypted'),
    cert: fs.readFileSync('certs/server.crt'),
  };

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_URI],
        queue: RMQ_QUEUE_NAME,
        noAck: false,
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
        credentials: grpc.ServerCredentials.createSsl(
          null,
          [{
            private_key: certOptions.key,
            cert_chain: certOptions.cert,
          }],
          false
        ),
        url: GRPC_URL
      }
    }
  );
  await app.startAllMicroservices();
}
bootstrap();
