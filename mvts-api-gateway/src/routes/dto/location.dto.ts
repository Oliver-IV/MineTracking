import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LocationDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;
}