import { Controller, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { ChangeLightStateValidatedDto, CreateTrafficLightValidatedDto, UpdateTrafficLightValidatedDto } from './dto'

@Controller('traffic-lights')
export class TrafficLightsController {
  constructor(private readonly trafficLightsService: TrafficLightsService) {}

  @Post()
  create(@Body() createTrafficLightDto: CreateTrafficLightValidatedDto) {
    return this.trafficLightsService.create(createTrafficLightDto);
  }

  @Get()
  findAll() {
    return this.trafficLightsService.findAll();
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.trafficLightsService.findOne(id);
  }

  @Patch('state')
  changeState(@Query('id') id: string, @Body() changeStateDto: ChangeLightStateValidatedDto) {
    return this.trafficLightsService.changeState(id, changeStateDto);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateTrafficLightDto: UpdateTrafficLightValidatedDto) {
    return this.trafficLightsService.update(id, updateTrafficLightDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.trafficLightsService.remove(id);
  }
}
