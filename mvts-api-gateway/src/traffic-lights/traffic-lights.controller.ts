import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { CreateTrafficLightDto, UpdateTrafficLightDto } from '@app/common/types/trafficLights'

@Controller('traffic-lights')
export class TrafficLightsController {
  constructor(private readonly trafficLightsService: TrafficLightsService) {}

  @Post()
  create(@Body() createTrafficLightDto: CreateTrafficLightDto) {
    return this.trafficLightsService.create(createTrafficLightDto);
  }

  @Get()
  findAll() {
    return this.trafficLightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trafficLightsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrafficLightDto: UpdateTrafficLightDto) {
    return this.trafficLightsService.update(id, updateTrafficLightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trafficLightsService.remove(id);
  }
}
