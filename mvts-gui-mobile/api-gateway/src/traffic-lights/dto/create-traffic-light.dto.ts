import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { LocationDto } from "./location.dto";
import { Mode } from "../type/traffic-lights";

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
