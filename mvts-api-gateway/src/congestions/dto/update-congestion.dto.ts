import { PartialType } from '@nestjs/mapped-types';
import { CreateCongestionDto } from './create-congestion.dto';

export class UpdateCongestionDto extends PartialType(CreateCongestionDto) {}
