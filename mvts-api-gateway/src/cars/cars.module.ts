import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CARS_SERVICE } from '@app/common';
import { join } from 'path';
import { CARS_PACKAGE_NAME } from './type/cars';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CARS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: CARS_PACKAGE_NAME,
          protoPath: join(__dirname, '../cars.proto'),
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}