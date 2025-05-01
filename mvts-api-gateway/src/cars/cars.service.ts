import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { 
  CARS_SERVICE_NAME, 
  CarsServiceClient,
  CreateCarDto, UpdateCarDto 
} from '@app/common';
import { CARS_SERVICE } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class CarsService implements OnModuleInit {
  private carsService: CarsServiceClient;

  constructor(@Inject(CARS_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
      this.carsService = this.client.getService<CarsServiceClient>(CARS_SERVICE_NAME);
  }

  create(createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  findAll() {
    return this.carsService.findAllCars({});
  }

  findOne(id: string) {
    return this.carsService.findOneCar({ id });
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return this.carsService.updateCar({...updateCarDto, id});
  }

  remove(id: string) {
    return this.carsService.removeCar({ id });
  }
}