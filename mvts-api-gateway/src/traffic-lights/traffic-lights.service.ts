import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { 
  CreateTrafficLightDto, UpdateTrafficLightDto,
  TrafficLightsServiceClient
} from '@app/common/types/trafficLights';
import { TRAFFIC_LIGHTS_SERVICE_NAME } from '@app/common/types/trafficLights';
import { ClientGrpc } from '@nestjs/microservices';
import { TRAFFIC_LIGHTS_SERVICE } from '@app/common';

@Injectable()
export class TrafficLightsService implements OnModuleInit{
  private trafficLightsService: TrafficLightsServiceClient;

  onModuleInit() {
    this.trafficLightsService = this.client.getService<TrafficLightsServiceClient>(TRAFFIC_LIGHTS_SERVICE_NAME);
  }

  constructor(@Inject(TRAFFIC_LIGHTS_SERVICE) private client: ClientGrpc) {}

  create(createTrafficLightDto: CreateTrafficLightDto) {
    return this.trafficLightsService.createTrafficLight(createTrafficLightDto);
  }

  findAll() {
    return this.trafficLightsService.findAllTrafficLights({});
  }

  findOne(id: string) {
    return this.trafficLightsService.findOneTrafficLight({ id });
  }

  update(id: string, updateTrafficLightDto: UpdateTrafficLightDto) {
    return this.trafficLightsService.updateTrafficLight({...updateTrafficLightDto, id})
  }

  remove(id: string) {
    return this.trafficLightsService.removeTrafficLight({ id });
  }
}
