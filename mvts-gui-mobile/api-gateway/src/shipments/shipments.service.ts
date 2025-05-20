import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EmptyMessage, GetShipmentByDateRequest, ListShipmentDTO, ShipmentByIdDTO, ShipmentCreateDTO, ShipmentDTO, ShipmentServiceClient } from './protos/shipment_service';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ShipmentsService implements OnModuleInit, ShipmentServiceClient{
  private shipmentService : ShipmentServiceClient;
    constructor(@Inject('SHIPMENT_PACKAGE') private client : ClientGrpc){}

  onModuleInit() {
    this.shipmentService = this.client.getService<ShipmentServiceClient>('ShipmentService');
  }
  createShipment(request: ShipmentCreateDTO): Observable<ShipmentByIdDTO> {
    return this.shipmentService.createShipment(request);
  }
  getShipmentById(request: ShipmentByIdDTO): Observable<ShipmentDTO> {
    return this.shipmentService.getShipmentById(request);
  }
  getAll(request: EmptyMessage): Observable<ListShipmentDTO> {
    return this.shipmentService.getAll(request);
  }
  getByDate(request: GetShipmentByDateRequest): Observable<ListShipmentDTO> {
    return this.shipmentService.getByDate(request);
  }

}
