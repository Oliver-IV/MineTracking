import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CongestionsService } from './congestions.service';
import { CreateCongestionDto } from './dto/create-congestion.dto';
import { UpdateCongestionDto } from './dto/update-congestion.dto';

@Controller('congestions')
export class CongestionsController {
  constructor(private readonly congestionsService: CongestionsService) {}

  @Post()
  create(@Body() createCongestionDto: CreateCongestionDto) {
    return this.congestionsService.create(createCongestionDto);
  }

  @Get()
  findAll() {
    return this.congestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congestionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCongestionDto: UpdateCongestionDto,
  ) {
    return this.congestionsService.update(+id, updateCongestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congestionsService.remove(+id);
  }
}
