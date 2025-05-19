import { IsString, ValidateNested } from "class-validator";
import { LocationDto } from "./location.dto";
import { Type } from "class-transformer";

export class CreateRouteDto {

    @IsString()
    startId: string

    @IsString()
    endId: string
    
}