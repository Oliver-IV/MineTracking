import { IsLatitude, IsLongitude, IsOptional, IsString } from "class-validator";

export class LocationDto {
    @IsOptional()
    @IsString()
    locationId: string;

    @IsLatitude()
    latitude: string;

    @IsLongitude()
    longitude: string;
}