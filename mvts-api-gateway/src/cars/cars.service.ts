import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { 
  CARS_SERVICE_NAME, 
  CarsServiceClient,
  CreateCarDto, 
  UpdateCarDto,
  Car,
  Cars,
  Empty,
  FindOneCarDto
} from './type/cars';
import { CARS_SERVICE } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CarsService implements OnModuleInit {
  private carsService: CarsServiceClient;

  constructor(@Inject(CARS_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.carsService = this.client.getService<CarsServiceClient>(CARS_SERVICE_NAME);
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      return await lastValueFrom(this.carsService.createCar(createCarDto));
    } catch (error) {
      throw new HttpException(
        'Failed to create car: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Car[]> {
    try {
      const response = await lastValueFrom(this.carsService.findAllCars({} as Empty));
      if (!response || !response.cars) {
        throw new HttpException('No cars found', HttpStatus.NOT_FOUND);
      }
      return response.cars;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cars: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: string): Promise<Car> {
    try {
      const car = await lastValueFrom(this.carsService.findOneCar({ carId: id } as FindOneCarDto));
      if (!car) {
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
      }
      return car;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch car: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const updateData = { ...updateCarDto, carId: id };
      const updatedCar = await lastValueFrom(this.carsService.updateCar(updateData));
      
      if (!updatedCar) {
        throw new HttpException('Car update failed', HttpStatus.BAD_REQUEST);
      }
      
      return updatedCar;
    } catch (error) {
      throw new HttpException(
        'Failed to update car: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string): Promise<{ success: boolean }> {
    try {
      const result = await lastValueFrom(this.carsService.removeCar({ carId: id } as FindOneCarDto));
      return { success: !!result };
    } catch (error) {
      throw new HttpException(
        'Failed to delete car: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}