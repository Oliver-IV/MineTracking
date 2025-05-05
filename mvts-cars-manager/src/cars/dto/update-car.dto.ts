import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsNotEmpty()
  @IsNumberString()
  carId: string;
}
