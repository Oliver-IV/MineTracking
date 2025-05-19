import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
import { AUTH_SERVICE_PACKAGE_NAME } from './auth/protos/auth';
import { GRPC_URL } from './configs/grpc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const certOptions = {
    key: fs.readFileSync('certs/server.key.decrypted'),
    cert: fs.readFileSync('certs/server.crt'),
  };

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../src/auth/protos/auth.proto'),
        package: [AUTH_SERVICE_PACKAGE_NAME],
        url: GRPC_URL,
        credentials: grpc.ServerCredentials.createSsl(
          null,
          [{
            private_key: certOptions.key,
            cert_chain: certOptions.cert,
          }],
          false
        )
      }
    }
  );
  await app.startAllMicroservices();
}
bootstrap();
