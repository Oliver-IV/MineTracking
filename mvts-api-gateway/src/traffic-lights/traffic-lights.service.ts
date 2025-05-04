import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { 
  CreateTrafficLightDto, UpdateTrafficLightDto,
  TrafficLightsServiceClient,
  TRAFFIC_LIGHTS_SERVICE_NAME,
  TRAFFIC_LIGHTS_PACKAGE_NAME
} from './type/traffic-lights';
import { ClientGrpc } from '@nestjs/microservices';
import { ChangeLightStateDto } from './type/traffic-lights';

@Injectable()
export class TrafficLightsService implements OnModuleInit{
  private trafficLightsService: TrafficLightsServiceClient;

  onModuleInit() {
    this.trafficLightsService = this.client.getService<TrafficLightsServiceClient>(TRAFFIC_LIGHTS_SERVICE_NAME);
  }

  constructor(@Inject(TRAFFIC_LIGHTS_PACKAGE_NAME) private client: ClientGrpc) {}

  create(createTrafficLightDto: CreateTrafficLightDto) {
    return this.trafficLightsService.createTrafficLight(createTrafficLightDto);
  }

  findAll() {
    return this.trafficLightsService.findAllTrafficLights({});
  }

  findOne(id: string) {
    return this.trafficLightsService.findOneTrafficLight({ id });
  }

  update(trafficLightId: string, updateTrafficLightDto: UpdateTrafficLightDto) {
    return this.trafficLightsService.updateTrafficLight({...updateTrafficLightDto, trafficLightId});
  }
  changeState(trafficLightId: string, changeStateDto: ChangeLightStateDto) {
    return this.trafficLightsService.changeTrafficLightState({...changeStateDto, trafficLightId});
  }

  remove(id: string) {
    return this.trafficLightsService.removeTrafficLight({ id });
  }
}
