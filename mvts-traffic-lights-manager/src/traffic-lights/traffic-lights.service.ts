import {
  // BadRequestException,
  // ConflictException,
  Inject,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TrafficLight,
  TrafficLights,
  CreateTrafficLightDto,
  UpdateTrafficLightDto,
  State,
  TrafficLightEntity,
  LocationEntity,
  ChangeLightStateDto,
} from '@app/common';
import { LocationService } from './location.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { PATTERNS, TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE } from 'configs/rmq.config';

@Injectable()
export class TrafficLightsService {
  constructor(
    @InjectRepository(TrafficLightEntity)
    private trafficLightRepository: Repository<TrafficLightEntity>,
    @Inject() private locationService: LocationService,
    @Inject('TRAFFIC_LIGHTS_SERVICE') private rmqClient: ClientProxy,
    @Inject(TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE)
    private rmqColorChangeClient: ClientProxy,
  ) { }

  formatId(count: number, padding: number = 5): string {
    const nextId = count + 1;
    return nextId.toString().padStart(padding, '0');
  }

  async generateId(): Promise<string> {
    const count = await this.trafficLightRepository.count();
    return this.formatId(count);
  }

  async create(
    createTrafficLightDto: CreateTrafficLightDto,
  ): Promise<TrafficLight> {
    if (!createTrafficLightDto.location) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'The location must be defined',
      });
    }
    const { latitude, longitude } = createTrafficLightDto.location;
    let location: LocationEntity | null =
      await this.locationService.findByCoordinates(latitude, longitude);

    if (location) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'Traffic light at that location already exists',
      });
    }
    const trafficLightId = await this.generateId();
    location = {
      locationId: trafficLightId,
      latitude,
      longitude,
    };
    const trafficLight: TrafficLightEntity = this.trafficLightRepository.create(
      { ...createTrafficLightDto, trafficLightId, state: State.RED, location },
    );
    const savedTrafficLight =
      await this.trafficLightRepository.save(trafficLight);

    this.rmqClient.emit(PATTERNS.TRAFFIC_LIGHT_CREATED, createTrafficLightDto);

    return savedTrafficLight;
  }

  async findAll(): Promise<TrafficLights> {
    const trafficLights: TrafficLight[] =
      await this.trafficLightRepository.find({});
    return { trafficLights };
  }

  async findOne(trafficLightId: string): Promise<TrafficLight> {
    const trafficLight: TrafficLightEntity | null =
      await this.trafficLightRepository.findOne({ where: { trafficLightId } });

    if (!trafficLight) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Traffic light not found by id ${trafficLightId}`,
      });
    }
    return trafficLight;
  }

  async update(
    trafficLightId: string,
    updateTrafficLightDto: UpdateTrafficLightDto,
  ): Promise<TrafficLight> {
    const trafficLight: TrafficLight = await this.findOne(trafficLightId);
    if (!trafficLight) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Traffic light not found by id ${trafficLightId}`,
      });
    }
    const updated = await this.trafficLightRepository.save({
      ...trafficLight,
      ...updateTrafficLightDto,
    });

    if (!updated) {
      throw new RpcException({
        code: status.UNKNOWN,
        message: `Something went wrong while updating the traffic light with id ${trafficLightId}`,
      });
    }
    return updated;
  }

  async changeState(
    changeLightStateDto: ChangeLightStateDto,
  ) {
    const { trafficLightId, state } = changeLightStateDto;
    // const trafficLight: TrafficLight = await this.findOne(trafficLightId);

    // const updated = await this.trafficLightRepository.save({
    //   ...trafficLight,
    //   state,
    // });

    //the conejo 4 the color change
    this.rmqColorChangeClient.emit(TRAFFIC_LIGHT_COLOR_CHANGE_QUEUE, {
      trafficLightId,
      state,
    });

  }

  async remove(trafficLightId: string): Promise<TrafficLight> {
    const trafficLight: TrafficLightEntity | null =
      await this.trafficLightRepository.findOne({ where: { trafficLightId } });
    if (trafficLight) {
      const deleted = await this.trafficLightRepository.remove(trafficLight);
      return deleted;
    }
    throw new RpcException({
      code: status.NOT_FOUND,
      message: `Traffic light not found by id ${trafficLightId}`,
    });
  }
}
