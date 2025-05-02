import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CarsService } from './cars.service';
import { 
  CarsServiceController,
  CreateCarDto, 
  FindOneCarDto,
  UpdateCarDto
} from '@app/common'

@Controller()
export class CarsController implements CarsServiceController {
  constructor(private readonly carsService: CarsService) {}

  createCar(createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  findAllCars() {
    return this.carsService.findAll();
  }

  findOneCar( findOneCardto: FindOneCarDto) {
    return this.carsService.findOne(findOneCardto.carId);
  }

  updateCar( updateCarDto: UpdateCarDto) {
    return this.carsService.update(updateCarDto.carId, updateCarDto);
  }

  removeCar( findOneCardto: FindOneCarDto) {
    return this.carsService.remove(findOneCardto.carId);
  }
}
