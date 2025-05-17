import { ValidateNested } from "class-validator";
import { LocationDto } from "./location.dto";
import { Type } from "class-transformer";

export class CreateRouteDto {

    @ValidateNested()
    @Type(() => LocationDto)
    start: LocationDto;

    @ValidateNested()
    @Type(() => LocationDto)
    end: LocationDto;
}