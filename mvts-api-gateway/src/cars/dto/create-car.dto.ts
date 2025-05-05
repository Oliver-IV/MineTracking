import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CapacityDto } from "./capacity.dto";
import { Type } from "class-transformer";
import { CarType, State } from "../type/cars";

export class CreateCarValidatedDto {

    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => CapacityDto)
    capacity: CapacityDto;

    @IsEnum(CarType,{message: "Invalid car type"})
    type: CarType;
}
