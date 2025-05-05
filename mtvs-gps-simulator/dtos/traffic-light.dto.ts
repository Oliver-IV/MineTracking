import { LocationDto } from "./location.dto";
import { State } from "./state.enum";

export class TrafficLightDto {
    trafficLightId: string;
    location: LocationDto;
    currentState: State ;
    cycleIntervals: {
        red: number;
        yellow: number;
        green: number;
    };
    intervalId: NodeJS.Timeout | null;
    active: boolean;
    radius: number; // Radio de influencia en metros
}