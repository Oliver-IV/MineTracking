import { Module } from '@nestjs/common';
import { CongestionsService } from './congestions.service';
import { CongestionsController } from './congestions.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CONGESTION_SERVICE_URL } from 'src/configs/enviroment';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONGESTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: CONGESTION_SERVICE_URL,
          package: 'congestion',
          protoPath: join(process.cwd(), 'src', 'congestions', 'protos', 'congestion_service.proto')
        },
      },
    ]),
  ],
  controllers: [CongestionsController],
  providers: [CongestionsService],
})
export class CongestionsModule {}
