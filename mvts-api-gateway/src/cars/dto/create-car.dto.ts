import { IsIn, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CapacityDto } from "./capacity.dto";
import { Type } from "class-transformer";

export class CreateCarValidatedDto {

    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => CapacityDto)
    capacity: CapacityDto;

    @IsIn(["heavy","light","medium"],{message: "Invalid car type"})
    type: string;

    @IsIn(["available", "unavailable", "on route"], { message: "Invalid state" })
    state: string = 'available';
}
