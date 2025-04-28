import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MqttService } from '../services/mqtt.service';
import { LocationMessageDto } from 'src/cars/dtos/location-message.dto';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly mqttService: MqttService) { }

  @MessagePattern('car_location_updates')
  async handleCarLocationUpdate(@Payload() data: LocationMessageDto) {
    this.logger.log(`[Controller] Recibida actualización de ubicación para carID: ${data.carId}`);
    this.logger.log(`[Controller] Coordenadas: ${data.location.latitude}, ${data.location.longitude}`);
    this.mqttService.publicar('cars/location', {
      carId: data.carId,
      location: data.location,
    });
    return { processed: true };
  }

  @MessagePattern('traffic_lights_color_updates')
  async handleTrafficLightsColorUpdate(@Payload() data: any) {
    this.logger.log(`[Controller] Recibida actualización de color de semáforo para carID: ${data.carId}`);
    this.logger.log(`[Controller] Color: ${data.color}`);
    this.mqttService.publicar('traffic_lights/color', {
      trafficLightId: data.trafficLightId,
      color: data.color
    });
    return { processed: true };
  }
}
