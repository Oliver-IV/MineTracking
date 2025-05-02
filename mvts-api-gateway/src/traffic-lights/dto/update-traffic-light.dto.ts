import { PartialType } from '@nestjs/mapped-types';
import { CreateTrafficLightDto } from './create-traffic-light.dto';

export class UpdateTrafficLightDto extends PartialType(CreateTrafficLightDto) {}
