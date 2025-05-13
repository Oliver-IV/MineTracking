import { Module } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { TrafficLightsController } from './traffic-lights.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRAFFIC_LIGHTS_SERVICE } from '@app/common';
import { join } from 'path';
import { TRAFFIC_LIGHTS_PACKAGE_NAME} from './type/traffic-lights';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: TRAFFIC_LIGHTS_SERVICE,
          transport: Transport.GRPC,
          options: {
            package: TRAFFIC_LIGHTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../traffic-lights.proto'),
            credentials: grpc.credentials.createSsl(fs.readFileSync('./certs/server.crt'))
          },
        },
      ]),
    ],
  controllers: [TrafficLightsController],
  providers: [TrafficLightsService],
})
export class TrafficLightsModule {}
