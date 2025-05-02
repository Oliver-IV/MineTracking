import { LocationDto } from "./location.dto";

export class TrafficLightDto {
    id: string;
    location: LocationDto;
    currentColor: 'RED' | 'YELLOW' | 'GREEN';
    cycleIntervals: {
        red: number;
        yellow: number;
        green: number;
    };
    intervalId: NodeJS.Timeout | null;
    active: boolean;
    radius: number; // Radio de influencia en metros
}