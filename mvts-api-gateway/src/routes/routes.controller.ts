import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.createRoute(createRouteDto);
  }

  @Get()
  findAll() {
    return this.routesService.findAllRoutes();
  }

  @Patch(':id')
  update(@Body() updateRouteDto: UpdateRouteDto, @Param('id') id: string) {
    return this.routesService.updateRoute(id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.deleteRoute(id);
  }
}
