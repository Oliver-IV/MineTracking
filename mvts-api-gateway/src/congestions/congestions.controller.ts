import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { CongestionsService } from './congestions.service';
import { CongestionCreateDTO } from './protos/congestion_service';

@Controller('congestions')
export class CongestionsController {
  constructor(private readonly congesService: CongestionsService) {}

  @Post()
  create(@Body() createCongeDto: CongestionCreateDTO) {
    return this.congesService.createCongestion(createCongeDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congesService.getCongestionById({id:parseInt(id)});
  }

  @Get()
  getAll(){
    return this.congesService.getAll({});
  }
  @Get('date/:id')
  getByDate(@Param('id') id: string) {
    return this.congesService.getByDate({optionDate:parseInt(id)});
  }
}
