import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarValidatedDto, UpdateCarValidatedDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarValidatedDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateCarDto: UpdateCarValidatedDto) {
    console.log(id);
    return this.carsService.update(id, updateCarDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.carsService.remove(id);
  }
}