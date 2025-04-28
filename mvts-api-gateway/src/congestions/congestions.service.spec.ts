import { Test, TestingModule } from '@nestjs/testing';
import { CongestionsService } from './congestions.service';

describe('CongestionsService', () => {
  let service: CongestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongestionsService],
    }).compile();

    service = module.get<CongestionsService>(CongestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
