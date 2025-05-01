import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from './constants';
import { join } from 'path';
import { protobufPackage } from './proto/cars';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CARS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, '../cars/proto/cars.proto'),
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}