import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CongestionsModule } from './congestions/congestions.module';
import { CargosModule } from './cargos/cargos.module';
import { TrafficLightsModule } from './traffic-lights/traffic-lights.module';
import { CarsModule } from './cars/cars.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    CongestionsModule,
    CargosModule,
    TrafficLightsModule,
    CarsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
