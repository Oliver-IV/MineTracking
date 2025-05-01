import { Controller } from '@nestjs/common';
import { TrafficLightsService } from './traffic-lights.service';
import { CreateTrafficLightDto, FindOneTrafficLightDto, UpdateTrafficLightDto , 
  TrafficLightsServiceController, TrafficLightsServiceControllerMethods} from '@app/common/types/trafficLights';

@Controller()
@TrafficLightsServiceControllerMethods()
export class TrafficLightsController implements TrafficLightsServiceController{
  constructor(private readonly trafficLightsService: TrafficLightsService) {}

  createTrafficLight( createTrafficLightDto: CreateTrafficLightDto) {
    return this.trafficLightsService.create(createTrafficLightDto);
  }

  findAllTrafficLights() {
    return this.trafficLightsService.findAll();
  }

  findOneTrafficLight( findOneTrafficLight: FindOneTrafficLightDto) {
    return this.trafficLightsService.findOne(findOneTrafficLight.id);
  }

  updateTrafficLight( updateTrafficLightDto: UpdateTrafficLightDto) {
    return this.trafficLightsService.update(updateTrafficLightDto.id, updateTrafficLightDto);
  }

  removeTrafficLight( findOneTrafficLight: FindOneTrafficLightDto) {
    return this.trafficLightsService.remove(findOneTrafficLight.id);
  }
}
