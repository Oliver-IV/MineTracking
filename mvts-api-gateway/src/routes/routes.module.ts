import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ROUTES_SERVICE_PACKAGE_NAME } from './protos/routes';
import { ROUTES_SERVICE_URL } from 'src/configs/enviroment';
import { join } from 'path';
import * as fs from 'fs';
import * as grpc from '@grpc/grpc-js';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  imports: [
    ClientsModule.register([
      {
        name: ROUTES_SERVICE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: ROUTES_SERVICE_URL,
          package: 'routes_service',
          protoPath: join(process.cwd(), 'src', 'routes', 'protos', 'routes.proto'),
          credentials: grpc.credentials.createSsl(fs.readFileSync('./certs/server.crt'))
        },
      },
    ])
  ],
})
export class RoutesModule {}
