import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { TrafficLight, CreateTrafficLightDto, UpdateTrafficLightDto, TrafficLights } from '@app/common/types/trafficLights';
import { randomUUID } from 'crypto';

@Injectable()
export class TrafficLightsService implements OnModuleInit{
  private readonly trafficLights : TrafficLight[] = [];
  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.create({name:`traffic light ${i+1}`,location: 'location x', mode: 'auto'});
    }
  }
  create(createTrafficLighDto: CreateTrafficLightDto): TrafficLight {
      const trafficLight: TrafficLight ={
        ...createTrafficLighDto,
        id: randomUUID(),
      };
      this.trafficLights.push(trafficLight);
      return trafficLight;
    }
    
    findAll() : TrafficLights{
      return { trafficLights: this.trafficLights};
    }
  
    findOne(id: string) : TrafficLight{
      const trafficLight = this.trafficLights.find(tl => tl.id === id);
      if(trafficLight){
        return trafficLight;
      }
      throw new NotFoundException(`Traffic light not found by id ${id}` );
    }
  
    update(id: string, updateTrafficLightDto: UpdateTrafficLightDto) : TrafficLight{
      const tlIndex = this.trafficLights.findIndex(tl => tl.id === id);
      if(tlIndex !== -1){
        this.trafficLights[tlIndex] = {
          ...this.trafficLights[tlIndex],
          ...updateTrafficLightDto,
        };
        return this.trafficLights[tlIndex];
      }
      throw new NotFoundException(`Traffic light not found by id ${id}` );
    }
  
    remove(id: string) : TrafficLight{
      const tlIndex = this.trafficLights.findIndex(tl => tl.id === id);
      if(tlIndex !== -1){
        return this.trafficLights.splice(tlIndex)[0];
      }
      throw new NotFoundException(`Traffic lights not found by id ${id}` );
    }
}
