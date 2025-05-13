import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from '@app/common';
import { join } from 'path';
import { CARS_PACKAGE_NAME } from './type/cars';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CARS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: CARS_PACKAGE_NAME,
          protoPath: join(__dirname, '../cars.proto'),
          url: 'localhost:5001',
          credentials: grpc.credentials.createSsl(fs.readFileSync('./certs/server.crt')),
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}