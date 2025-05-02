import { LocationDto } from "./location.dto";

export class CarSimulationDto {
    active: boolean;
    currentLocation: LocationDto;
    destination: LocationDto | null;
    route: LocationDto[];
    currentRouteIndex: number;
    speed: number; // km/h
    updateInterval: number; // milisegundos
    simulationId: string | null;
    intervalId: NodeJS.Timeout | null;
    isStopped: boolean;
}