import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TrafficLightsModule } from './traffic-lights/traffic-lights.module';

@Module({
  imports: [CarsModule, TrafficLightsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
