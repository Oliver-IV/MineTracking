import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SHIPMENTS_SERVICE_URL } from 'src/configs/enviroment';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: 'SHIPMENT_PACKAGE',
          transport: Transport.GRPC,
          options: {
            url: SHIPMENTS_SERVICE_URL,
            package: 'shipment',
            protoPath: join(process.cwd(), 'src', 'shipments', 'protos', 'shipment_service.proto')
          },
        },
      ]),
    ],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
})
export class ShipmentsModule {}
