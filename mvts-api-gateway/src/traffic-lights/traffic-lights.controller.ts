import { Controller, Get, Post, Body, Patch, Delete, UseInterceptors, Param } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { ChangeLightStateValidatedDto, CreateTrafficLightValidatedDto, UpdateTrafficLightValidatedDto } from './dto'
import { GrpcExceptionInterceptor } from '@app/common';

@Controller('traffic-lights')
@UseInterceptors(GrpcExceptionInterceptor)
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trafficLightsService.findOne(id);
  }

  @Patch('state/:id')
  changeState(@Param('id') id: string, @Body() changeStateDto: ChangeLightStateValidatedDto) {
    return this.trafficLightsService.changeState(id, changeStateDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrafficLightDto: UpdateTrafficLightValidatedDto) {
    return this.trafficLightsService.update(id, updateTrafficLightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trafficLightsService.remove(id);
  }
}
