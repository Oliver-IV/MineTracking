import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: 'SHIPMENT_PACKAGE',
          transport: Transport.GRPC,
          options: {
            url: 'localhost:5299',
            package: 'shipment',
            protoPath: join(__dirname, 'protos','shipment_service.proto'),
          },
        },
      ]),
    ],
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
})
export class ShipmentsModule {}
