import { PartialType } from '@nestjs/mapped-types';
import { CreateCarValidatedDto } from './create-car.dto';
import { IsEnum, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CapacityDto } from './capacity.dto';
import { Type } from 'class-transformer';
import { CarType, State } from '../type/cars';

export class UpdateCarValidatedDto extends PartialType(CreateCarValidatedDto) {
    @IsNotEmpty()
    @IsNumberString()
    carId:string;

    @IsOptional()
    @IsEnum(State, { message: "Invalid state" })
    state: State;

    @IsOptional()
    @ValidateNested()
    @Type(() => CapacityDto)
    capacity: CapacityDto;

    @IsOptional()
    @IsEnum(CarType, { message: "Invalid car type" })
    type: CarType;
}
