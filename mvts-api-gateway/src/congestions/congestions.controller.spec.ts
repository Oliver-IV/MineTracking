import { Test, TestingModule } from '@nestjs/testing';
import { CongestionsController } from './congestions.controller';
import { CongestionsService } from './congestions.service';

describe('CongestionsController', () => {
  let controller: CongestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongestionsController],
      providers: [CongestionsService],
    }).compile();

    controller = module.get<CongestionsController>(CongestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
