import type { LocationDTO } from "./location.dto";

export interface RouteDto {
    routeId: string;
    start: LocationDTO;
    end: LocationDTO;
}