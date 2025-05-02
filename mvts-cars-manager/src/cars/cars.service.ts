import { Car, Cars, CreateCarDto, UpdateCarDto } from '@app/common';
import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '@app/common/entities/car.entity';
import { CarType } from '@app/common/enums/car-type.enum';
import { State } from '@app/common/enums/state.enum';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DtoConverter } from './dto-converter';
import { MeasurementUnit } from '@app/common/enums/measurement-unit.enum';

@Injectable()
export class CarsService implements OnModuleInit{
  constructor(
    @InjectRepository(CarEntity) private carRepository: Repository<CarEntity>,
    @Inject() private converter: DtoConverter
  ){}
  
  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.create({name:`car ${i+1}`,capacity: {capacityId:'',measurementUnit: MeasurementUnit.KG, value:20}, type: CarType.HEAVY});
    }
  }

  formatId(count: number, padding: number = 5): string {
    const nextId = count + 1;
    return nextId.toString().padStart(padding, '0');
  }
  
  async generateCarId(): Promise<string> {
    const count = await this.carRepository.count({});
    return this.formatId(count);
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      const carEntity = this.converter.carDtoToEntity(
        createCarDto, 
        State.AVAILABLE, 
        await this.generateCarId()
      );
      
      const savedCar = await this.carRepository.save(carEntity);
      return this.converter.carEntityToDto(savedCar);
    } catch (error) {
      console.error('Error saving car:', error);
      throw new InternalServerErrorException('Something went wrong while saving the car');
    }
  }
  
  async findAll(): Promise<Cars> {
    const foundCars = await this.carRepository.find();
    if (foundCars.length === 0) {
      throw new NotFoundException('There are no registered cars');
    }

    const carsArr = foundCars.map(car => this.converter.carEntityToDto(car));
    return { cars: carsArr };
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId: id } });
    if (!car) {
      throw new NotFoundException(`Car not found by id ${id}`);
    }

    return this.converter.carEntityToDto(car);
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const state = this.converter.stringToState(updateCarDto.state);
    const updateEntity = this.converter.carDtoToEntity(updateCarDto, state, id);
    const result = await this.carRepository.update({ carId: id }, updateEntity);

    if (!result.affected || result.affected === 0) {
      throw new NotFoundException(`Car not found by id ${id}`);
    }

    const updatedCar = await this.carRepository.findOne({ where: { carId: id } });
    if (!updatedCar) {
      throw new InternalServerErrorException('Car was updated but could not be retrieved');
    }

    return this.converter.carEntityToDto(updatedCar);
  }

  async remove(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId: id } });
    if (!car) {
      throw new NotFoundException(`Car not found by id ${id}`);
    }
    
    const result = await this.carRepository.delete({ carId: id });
    if (!result.affected || result.affected === 0) {
      throw new InternalServerErrorException(`Something went wrong while removing the car with id ${id}`);
    }
    
    return this.converter.carEntityToDto(car);
  }
}
