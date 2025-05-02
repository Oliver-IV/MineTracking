import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '@app/common/entities/car.entity';
import { DtoConverter } from './dto-converter';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  controllers: [CarsController],
  providers: [CarsService, DtoConverter],
})
export class CarsModule {}
