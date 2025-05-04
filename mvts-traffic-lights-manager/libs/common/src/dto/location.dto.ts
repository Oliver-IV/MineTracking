import { IsLatitude, IsLongitude, IsNumberString, IsOptional } from "class-validator";

export class LocationDto {
    @IsOptional()
    @IsNumberString()
    locationId: string = '0';

    @IsLatitude()
    latitude: string;

    @IsLongitude()
    longitude: string;
}