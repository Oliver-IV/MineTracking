import { Module } from '@nestjs/common';
import { CongestionsService } from './congestions.service';
import { CongestionsController } from './congestions.controller';

@Module({
  controllers: [CongestionsController],
  providers: [CongestionsService],
})
export class CongestionsModule {}
