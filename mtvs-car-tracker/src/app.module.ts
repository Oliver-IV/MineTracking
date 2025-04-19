import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [CarsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
