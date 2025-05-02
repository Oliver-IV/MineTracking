import { Injectable } from '@nestjs/common';
import { CreateTrafficLightDto } from './dto/create-traffic-light.dto';
import { UpdateTrafficLightDto } from './dto/update-traffic-light.dto';

@Injectable()
export class TrafficLightsService {
  create(createTrafficLightDto: CreateTrafficLightDto) {
    return 'This action adds a new trafficLight';
  }

  findAll() {
    return `This action returns all trafficLights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trafficLight`;
  }

  update(id: number, updateTrafficLightDto: UpdateTrafficLightDto) {
    return `This action updates a #${id} trafficLight`;
  }

  remove(id: number) {
    return `This action removes a #${id} trafficLight`;
  }
}
