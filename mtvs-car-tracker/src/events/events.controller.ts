import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MqttService } from '../mqtt/mqtt.service';
import { LocationMessageDto } from 'src/cars/dtos/location-message.dto';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly mqttService: MqttService) { }

  @EventPattern('car_location_updates')
  async handleCarLocationUpdate(@Payload() data: LocationMessageDto) {
    this.logger.log(`[Controller] Recibida actualización de ubicación para carID: ${data.carId}`);
    this.logger.log(`[Controller] Coordenadas: ${data.location.latitude}, ${data.location.longitude}`);
    this.mqttService.publish('cars/location', {
      carId: data.carId,
      location: data.location,
      speed: data.speed,
      status: data.status
    });
    return { processed: true };
  }

  @EventPattern('traffic_lights_color_updates')
  async handleTrafficLightsColorUpdate(@Payload() data: any) {
    this.logger.log(`[Controller] Recibida actualización de color de semáforo para carID: ${data.carId}`);
    this.logger.log(`[Controller] Color: ${data.currentState}`);
    this.mqttService.publish('traffic_lights/color', {
      trafficLightId: data.trafficLightId,
      state: data.currentState,
      location: data.location,
      cycleIntervals: data.cycleIntervals,
      active: data.active
    });
    return { processed: true };
  }

  @EventPattern()
  async handleCongestionTraffic(@Payload() data: any) {
    this.logger.log(`[Controller] Congestión Recibida!!`);
    this.logger.log(`[Controller] Nombre: ${data.Name}, ID: ${data.Id}`);
    this.mqttService.publish('congestion/traffic', {
      trafficLightId: data.trafficLightId,
      color: data.color
    });
  }
}
