import { Test, TestingModule } from '@nestjs/testing';
import { TrafficLightsController } from './traffic-lights.controller';
import { TrafficLightsService } from './traffic-lights.service';

describe('TrafficLightsController', () => {
  let controller: TrafficLightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrafficLightsController],
      providers: [TrafficLightsService],
    }).compile();

    controller = module.get<TrafficLightsController>(TrafficLightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
