import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarValidatedDto, UpdateCarValidatedDto } from './dto';
import { GrpcExceptionInterceptor } from '@app/common';

@Controller('cars')
@UseInterceptors(GrpcExceptionInterceptor)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarValidatedDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  async findAll() {
    return await this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarValidatedDto) {
    console.log(id);
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}