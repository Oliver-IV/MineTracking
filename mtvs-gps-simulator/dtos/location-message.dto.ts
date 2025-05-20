import { CarDto } from "./car.dto";
import { LocationDto } from "./location.dto";

export class LocationMessageDto {
    timestamp: string;
    location: LocationDto;
    carId: string;
    speed: number;
    status: 'MOVING' | 'STOPPED';
    car: CarDto | undefined;
}