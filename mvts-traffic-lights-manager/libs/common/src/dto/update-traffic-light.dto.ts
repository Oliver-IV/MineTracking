import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { State } from '../types';
import { CreateTrafficLightValidatedDto } from './create-traffic-light.dto';

export class UpdateTrafficLightValidatedDto extends PartialType(
  CreateTrafficLightValidatedDto,
) {
  @IsNumberString()
  id: number;

  @IsOptional()
  @IsEnum(State)
  state: State;
}
