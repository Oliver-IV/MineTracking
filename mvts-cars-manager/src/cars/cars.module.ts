import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '@app/common/entities/car.entity';
import { DtoConverter } from './converter';
import { CapacityService } from './capacity.service';
import { CapacityEntity } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, CapacityEntity])],
  controllers: [CarsController],
  providers: [CarsService, DtoConverter, CapacityService],
})
export class CarsModule {}
