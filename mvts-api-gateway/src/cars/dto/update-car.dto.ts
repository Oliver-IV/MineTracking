import { PartialType } from '@nestjs/mapped-types';
import { CreateCarValidatedDto } from './create-car.dto';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';
import { State } from '../type/cars';

export class UpdateCarValidatedDto extends PartialType(CreateCarValidatedDto) {
    @IsNotEmpty()
    @IsNumberString()
    carId:string;

    @IsOptional()
    @IsEnum(State, { message: "Invalid state" })
    state: State;
}
