import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentCreateDTO } from './protos/shipment_service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) { }

  @Post()
  create(@Body() createCongeDto: ShipmentCreateDTO) {
    return this.shipmentsService.createShipment(createCongeDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.getShipmentById({ id: parseInt(id) });
  }

  @Get()
  getAll() {
    return this.shipmentsService.getAll({});
  }
  @Get('date/:id')
  getByDate(@Param('id') id: string) {
    return this.shipmentsService.getByDate({ optionDate: parseInt(id) });
  }
}
