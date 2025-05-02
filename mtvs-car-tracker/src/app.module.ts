import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { EventsModule } from './events/events.module';
import { MqttModule } from './mqtt/mqtt.module';
import { TrafficLightsModule } from './traffic-lights/traffic-lights.module';

@Module({
  imports: [CarsModule, EventsModule, MqttModule, TrafficLightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
