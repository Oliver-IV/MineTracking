import { Module } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { TrafficLightsController } from './traffic-lights.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRAFFIC_LIGHTS_SERVICE, TRAFFIC_LIGHTS_SERVICE_URL } from '@app/common';
import { join } from 'path';
import { TRAFFIC_LIGHTS_PACKAGE_NAME} from './type/traffic-lights';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: TRAFFIC_LIGHTS_SERVICE,
          transport: Transport.GRPC,
          options: {
            package: TRAFFIC_LIGHTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../traffic-lights.proto'),
            url: TRAFFIC_LIGHTS_SERVICE_URL,
          },
        },
      ]),
    ],
  controllers: [TrafficLightsController],
  providers: [TrafficLightsService],
})
export class TrafficLightsModule {}
