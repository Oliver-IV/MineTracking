import { PartialType } from '@nestjs/mapped-types';
import { CreateCarValidatedDto } from './create-car.dto';
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CapacityDto } from './capacity.dto';
import { Type } from 'class-transformer';

export class UpdateCarValidatedDto extends PartialType(CreateCarValidatedDto) {
    @IsNotEmpty()
    @IsNumberString()
    carId:string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsIn(["available", "unavailable", "on route"], { message: "Invalid state" })
    state: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CapacityDto)
    capacity: CapacityDto;

    @IsOptional()
    @IsIn(["heavy", "light", "medium"], { message: "Invalid car type" })
    type: string;
}
