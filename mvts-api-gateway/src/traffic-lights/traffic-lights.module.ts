import { Module } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { TrafficLightsController } from './traffic-lights.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ClientsModule.register([
      {
        name: 'TRAFFIC_LIGHT_PACKAGE',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        transport: Transport.GRPC,
        options: {
          package: 'trafficLightService',
          protoPath: join(__dirname, 'proto','trafficLight.proto'),
        },
      },
    ]),
  ],
  controllers: [TrafficLightsController],
  providers: [TrafficLightsService],
})
export class TrafficLightsModule {}
