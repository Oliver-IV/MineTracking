import { Injectable } from '@nestjs/common';
import { CreateCongestionDto } from './dto/create-congestion.dto';
import { UpdateCongestionDto } from './dto/update-congestion.dto';

@Injectable()
export class CongestionsService {
  create(createCongestionDto: CreateCongestionDto) {
    return 'This action adds a new congestion';
  }

  findAll() {
    return `This action returns all congestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} congestion`;
  }

  update(id: number, updateCongestionDto: UpdateCongestionDto) {
    return `This action updates a #${id} congestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} congestion`;
  }
}
