import { Test, TestingModule } from '@nestjs/testing';
import { TrafficLightsService } from './traffic-lights.service';

describe('TrafficLightsService', () => {
  let service: TrafficLightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficLightsService],
    }).compile();

    service = module.get<TrafficLightsService>(TrafficLightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
