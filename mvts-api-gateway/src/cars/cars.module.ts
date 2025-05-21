import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from '@app/common';
import { join } from 'path';
import { CARS_PACKAGE_NAME } from './type/cars';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
import { CARS_MANAGER_SERVICE_URL } from 'src/configs/enviroment';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CARS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: CARS_PACKAGE_NAME,
          protoPath: join(__dirname, '../cars.proto'),
          url: CARS_MANAGER_SERVICE_URL,
          credentials: grpc.credentials.createSsl(fs.readFileSync(join(process.cwd(), "certs", "server.crt"))),
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}