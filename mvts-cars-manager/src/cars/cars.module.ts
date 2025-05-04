import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  CarEntity, CapacityEntity,
} from '@app/common';
import { Converter } from './converter';
import { CapacityService } from './capacity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity, CapacityEntity]),
  ],
  controllers: [CarsController],
  providers: [CarsService, Converter, CapacityService],
})
export class CarsModule {}
