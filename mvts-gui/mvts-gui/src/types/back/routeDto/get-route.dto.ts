import type { LocationDTO } from "./location.dto" ;

export interface GetRouteDto {
    routeId: string ;
    start: LocationDTO ;
    end: LocationDTO ;
}