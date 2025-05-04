import { 
  Car, Cars, CreateCarDto, UpdateCarDto,
  CarEntity, State
  } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CapacityService } from './capacity.service';
import { CreatedTrafficLightValidatedDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class CarsService{
  constructor(
    @InjectRepository(CarEntity) private carRepository: Repository<CarEntity>,
    @Inject() private capacityService: CapacityService,
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
      const {capacity} = createCarDto;
      if(!capacity){
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: 'Capacity must be defined'
        });
      }
      const carId = await this.generateCarId();
      capacity.capacityId = carId;
      const carEntity: CarEntity = {
        ...createCarDto,
        state: State.AVAILABLE,
        carId,
        capacity
      };
        
      carEntity.capacity = await this.capacityService.createCapacity(capacity);

      const savedCar =  await this.carRepository.save(carEntity);

      return savedCar;
    } catch (error) {
      console.error('Error saving car:', error);
      throw new RpcException({
        code: status.INTERNAL,
        message: 'Something went wrong while saving the car'
      });
    }
  }
  
  /**
   * Obtiene todos los autos en la bd
   * @returns Proto con una lista de los carros encontrados
   */
  async findAll(): Promise<Cars> {
    const cars = await this.carRepository.find();
    if (cars.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'There are no registered cars'
      });
    }
    return { cars };
  }

  /**
   * Busca un carro con el id del parametro
   * @param id - id mediante el cual se buscara el carro en la bd
   * @returns - El carro encontrado
   * @throws NotFoundException - si no se encontró un carro con el id
   */
  async findOne(carId: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId } });
    if (!car) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Car not found by id ${carId}`
      });
    }

    return car;
  }

  /**
   * 
   * @param id - 
   * @param updateCarDto 
   * @returns 
   */
  async update(carId: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId} });
    if (!car) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Car not found by id ${carId}`
      });
    }
    const updated = await this.carRepository.save({...car,...updateCarDto}); 
    
    if(!updated){
      throw new RpcException({
        code: status.UNKNOWN,
        message: `Something went wrong while updating the car with id ${carId}`
      });
    }
    return updated;
  }

  async remove(carId: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { carId} });
    if (!car) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Car not found by id ${carId}`
      });
    }
    
    const deleted = await this.carRepository.remove(car);
    if (!deleted) {
      throw new RpcException({
        code: status.UNKNOWN,
        message: `Something went wrong while updating the car with id ${carId}`
      });
    }
    return deleted;
  }
}
