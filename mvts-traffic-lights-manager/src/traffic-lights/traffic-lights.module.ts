import { Module } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { TrafficLightsController } from './traffic-lights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity,TrafficLightEntity } from '@app/common';
import { LocationService } from './location.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_CLIENT_NAME, RMQ_QUEUE_NAME, RMQ_URI } from 'configs/rmq.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrafficLightEntity, LocationEntity]),
    ClientsModule.register([
      {
        name: RMQ_CLIENT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URI],
          queue: RMQ_QUEUE_NAME,
        },
      },
    ]),
  ],
  controllers: [TrafficLightsController],
  providers: [TrafficLightsService, LocationService],
})
export class TrafficLightsModule { }
