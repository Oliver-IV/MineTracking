import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Module({
  imports: [],
  providers: [MqttService],
  controllers: []
})
export class MqttModule {}
