import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CongestionsModule } from './congestions/congestions.module';
import { TrafficLightsModule } from './traffic-lights/traffic-lights.module';
import { CarsModule } from './cars/cars.module';
import { ReportsModule } from './reports/reports.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/JwtGuard';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    CongestionsModule,
    TrafficLightsModule,
    CarsModule,
    ReportsModule,
    ShipmentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useFactory: (authService: AuthService) => new JwtGuard(authService),
      inject: [AuthService],
    },
  ],
})
export class AppModule {}
