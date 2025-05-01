import { Controller } from '@nestjs/common';
import { CarsService } from './cars.service';
import { 
  CarsServiceController, 
  CarsServiceControllerMethods, 
  CreateCarDto, FindOneCarDto, UpdateCarDto } from '@app/common';

@Controller()
@CarsServiceControllerMethods()
export class CarsController implements CarsServiceController {
  constructor(private readonly carsService: CarsService) {}

  createCar(createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  findAllCars() {
    return this.carsService.findAll();
  }

  findOneCar( findOneCardto: FindOneCarDto) {
    return this.carsService.findOne(findOneCardto.id);
  }

  updateCar( updateCarDto: UpdateCarDto) {
    return this.carsService.update(updateCarDto.id, updateCarDto);
  }

  removeCar( findOneCardto: FindOneCarDto) {
    return this.carsService.remove(findOneCardto.id);
  }
}
