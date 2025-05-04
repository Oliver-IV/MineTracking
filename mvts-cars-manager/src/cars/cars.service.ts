import { 
  Car, Cars, CreateCarDto, UpdateCarDto,
  CarEntity, State } from '@app/common';
import { Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Converter } from './converter';
import { CapacityService } from './capacity.service';
import { CreatedTrafficLightValidatedDto } from './dto/traffic-light/created-traffic-light.dto';

@Injectable()
export class CarsService{
  constructor(
    @InjectRepository(CarEntity) private carRepository: Repository<CarEntity>,
    @Inject() private capacityService: CapacityService,
    @Inject() private converter: Converter
  ){}

  /**
 * Genera un id con ceros a la izquierda.
 * 
 * @param count - Numero actual de registros de carros existentes
 * @param padding - Longitud deseada en el id. Default 5
 * @returns Id formateado (queda 00001, 00042, etc)
 */
  formatId(count: number, padding: number = 5): string {
    const nextId = count + 1;
    return nextId.toString().padStart(padding, '0');
  }
  
  /**
 * Genera un id para un carro en base a la cantidad de registros en la bd
 * @returns el id generado
 */
  async generateCarId(): Promise<string> {
    const count = await this.carRepository.count();
    return this.formatId(count);
  }

  handleTrafficLightCreated(data: CreatedTrafficLightValidatedDto):string{
    return `traffic light created received: ${data}`;
  }

  /**
 * Guarda un carro en la bd
 * 
 * @param createCarDto - dto con los datos del carro a guardar
 * @returns El proto del carro creado
 * @throws InternalServerErrorException si ocurre un error al guardar el auto
 */
  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      const carEntity = this.converter.carDtoToEntity(
        createCarDto, 
        State.AVAILABLE, 
        await this.generateCarId()
      );
      const {measurementUnit, value} = carEntity.capacity;
      carEntity.capacity = await this.capacityService.createCapacity(measurementUnit, value);

      const savedCar =  await this.carRepository.save(carEntity);

      return this.converter.carEntityToProto(savedCar);
    } catch (error) {
      console.error('Error saving car:', error);
      throw new InternalServerErrorException('Something went wrong while saving the car');
    }
  }
  
  /**
   * Obtiene todos los autos en la bd
   * @returns Proto con una lista de los carros encontrados
   */
  async findAll(): Promise<Cars> {
    const foundCars = await this.carRepository.find();
    if (foundCars.length === 0) {
      throw new NotFoundException('There are no registered cars');
    }

    const carsArr = foundCars.map(car => this.converter.carEntityToProto(car));
    return { cars: carsArr };
  }

  /**
   * Busca un carro con el id del parametro
   * @param id - id mediante el cual se buscara el carro en la bd
   * @returns - El carro encontrado
   * @throws NotFoundException - si no se encontró un carro con el id
   */
  async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId: id } });
    if (!car) {
      throw new NotFoundException(`Car not found by id ${id}`);
    }

    return this.converter.carEntityToProto(car);
  }

  /**
   * 
   * @param id - 
   * @param updateCarDto 
   * @returns 
   */
  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId: id } });
    if (!car) {
      throw new NotFoundException(`Car not found by id ${id}`);
    }
    
    const { capacity, name, state, type } = updateCarDto;
    const updatedEntity: CarEntity = {
      carId: id,
      name: name ? name : car.name,
      state: state ? this.converter.stringToState(state) : car.state,
      type: type ? this.converter.stringToCarType(type) : car.type,
      capacity: capacity ? this.converter.capacityProtoToEntity(capacity) : car.capacity
    }
    
    const result = await this.carRepository.update({ carId: id }, updatedEntity);
    
    if (result.affected && result.affected > 0) {
      const updatedCar = await this.carRepository.findOne({ where: { carId: id } });
      if (!updatedCar) {
        throw new InternalServerErrorException('Car was updated but could not be retrieved');
      }
      return this.converter.carEntityToProto(updatedCar);
    }

    throw new InternalServerErrorException(`Something went wrong while updating the car with id ${id}`);
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
    
    return this.converter.carEntityToProto(car);
  }
}
