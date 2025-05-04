import { Controller } from '@nestjs/common';
import { CarsService } from './cars.service';
import { 
  Car,
  CarsServiceController,
  CarsServiceControllerMethods,
  CreateCarDto, 
  FindOneCarDto,
  UpdateCarDto
} from '@app/common'
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreatedTrafficLightValidatedDto } from './dto/traffic-light/created-traffic-light.dto';
import { PATTERNS } from 'configs/rmq.config';

@Controller()
@CarsServiceControllerMethods()
export class CarsController implements CarsServiceController {
  constructor(private readonly carsService: CarsService) {}

  @EventPattern(PATTERNS.TRAFFIC_LIGHT_CREATED)
  handleTrafficLightCreated(@Payload() data: CreatedTrafficLightValidatedDto){
    console.log(this.carsService.handleTrafficLightCreated(data));
  }

  createCar(createCarDto: CreateCarDto) {
    const car:Promise<Car> = this.carsService.create(createCarDto);
    return car;
  }

  findAllCars() {
    return this.carsService.findAll();
  }

  findOneCar( findOneCardto: FindOneCarDto) {
    return this.carsService.findOne(findOneCardto.carId);
  }

  updateCar( updateCarDto: UpdateCarDto) {
    console.log('in update endpoint');
    return this.carsService.update(updateCarDto.carId, updateCarDto);
  }

  removeCar( findOneCardto: FindOneCarDto) {
    return this.carsService.remove(findOneCardto.carId);
  }
}
