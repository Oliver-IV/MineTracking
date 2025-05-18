import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Mode, LocationDto } from '@app/common';

export class CreateTrafficLightValidatedDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsNotEmpty()
  @IsEnum(Mode)
  mode: Mode;

  @IsNotEmpty()
  @IsString()
  name: string;
}
