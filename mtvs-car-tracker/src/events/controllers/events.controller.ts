import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LocationMessageDto } from '../dtos/location-message.dto';
import { MqttService } from '../services/mqtt.service';

@Controller('events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(private readonly mqttService: MqttService) {}

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
}
