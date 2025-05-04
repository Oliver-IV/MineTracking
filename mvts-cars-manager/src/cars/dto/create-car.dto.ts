import { IsIn, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { CapacityDto } from "./capacity.dto";

export class CreateCarDto {
    @IsNotEmpty()
    @IsNumberString()
    carId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsIn(["available","unavailable","on route"],{message:"Invalid state"})
    state: string;

    @IsNotEmpty()
    capacity: CapacityDto;

    @IsIn(["heavy","light","medium"],{message: "Invalid car type"})
    type: string;
}
