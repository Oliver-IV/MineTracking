import { Car, Cars, CreateCarDto, UpdateCarDto } from '@app/common';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CarsService implements OnModuleInit{
  private readonly cars : Car[] = [];
  
  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.create({name:`car ${i+1}`,maxCapacity: 20, type: 'heavy load'});
    }
  }
  create(createCarDto: CreateCarDto): Car {
    const car: Car ={
      ...createCarDto,
      transitStatus: 'available',
      id: randomUUID(),
    };
    this.cars.push(car);
    return car;
  }
  
  findAll() : Cars{
    return { cars: this.cars};
  }

  findOne(id: string) : Car{
    const car = this.cars.find(car => car.id === id);
    if(car){
      return car;
    }
    throw new NotFoundException(`Car not found by id ${id}` );
  }

  update(id: string, updateCarDto: UpdateCarDto) : Car{
    const carIndex = this.cars.findIndex(car => car.id === id);
    if(carIndex !== -1){
      this.cars[carIndex] = {
        ...this.cars[carIndex],
        ...updateCarDto,
      };
      return this.cars[carIndex];
    }
    throw new NotFoundException(`Car not found by id ${id}` );
  }

  remove(id: string) : Car{
    const carIndex = this.cars.findIndex(car => car.id === id);
    if(carIndex !== -1){
      return this.cars.splice(carIndex)[0];
    }
    throw new NotFoundException(`Car not found by id ${id}` );
  }
}
