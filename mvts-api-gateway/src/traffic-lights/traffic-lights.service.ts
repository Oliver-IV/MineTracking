import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { 
  CreateTrafficLightDto, UpdateTrafficLightDto, ChangeLightStateDto,
  TrafficLightsServiceClient,
  TRAFFIC_LIGHTS_SERVICE_NAME,
} from './type/traffic-lights';
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

  update(trafficLightId: string, updateTrafficLightDto: UpdateTrafficLightDto) {
    return this.trafficLightsService.updateTrafficLight({...updateTrafficLightDto, trafficLightId});
  }
  changeState(trafficLightId: string, changeStateDto: ChangeLightStateDto) {
    this.trafficLightsService.changeTrafficLightState({...changeStateDto, trafficLightId});
  }

  remove(id: string) {
    return this.trafficLightsService.removeTrafficLight({ id });
  }
}
