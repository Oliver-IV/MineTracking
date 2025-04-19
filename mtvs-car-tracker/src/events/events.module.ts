import { Module } from '@nestjs/common';
import { MqttService } from './services/mqtt.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsController } from './controllers/events.controller';
import RABBITMQ_URL from 'src/configs/rabbitmq.config';

@Module({
  imports: [],
  providers: [MqttService],
  controllers: [EventsController]
})
export class EventsModule {}