import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { LocationDto } from "./location.dto";

export class UpdateRouteDto {

    @IsOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    start: LocationDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    end: LocationDto;
}