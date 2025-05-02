import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateTrafficLightDto } from './dto/update-traffic-light.dto';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface TrafficLightGrpcService {
  UpdateTrafficLightColor(data: {
    id: string;
    data: { color: string };
  }): Observable<{ message: string }>;
}

@Injectable()
export class TrafficLightsService implements OnModuleInit {
  private grpcService: TrafficLightGrpcService;

  constructor(@Inject('TRAFFIC_LIGHT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcService = this.client.getService<TrafficLightGrpcService>(
      'trafficLightService',
    );
  }

  findAll() {
    return `This action returns all trafficLights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trafficLight`;
  }

  update(id: number, updateTrafficLightDto: UpdateTrafficLightDto) {
    const payload = {
      id: id.toString(),
      data: {
        color: updateTrafficLightDto.color,
      },
    };

    return this.grpcService.UpdateTrafficLightColor(payload);
  }

  remove(id: number) {
    return `This action removes a #${id} trafficLight`;
  }
}
