import type { CarDto } from "./car.dto";
import type { LocationDto } from "./location.dto";

export interface LocationMessageDto {
    timestamp: string;
    location: LocationDto;
    carId: string;
    speed: number;
    status: 'MOVING' | 'STOPPED';
    car: CarDto | undefined;
}