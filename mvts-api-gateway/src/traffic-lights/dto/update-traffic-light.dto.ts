import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { State } from '../type/traffic-lights';
import { CreateTrafficLightValidatedDto } from './create-traffic-light.dto';

export class UpdateTrafficLightValidatedDto extends PartialType(CreateTrafficLightValidatedDto) {

  @IsNumberString()
  trafficLightId: string;

  @IsOptional()
  @IsEnum(State)
  state: State;
}
