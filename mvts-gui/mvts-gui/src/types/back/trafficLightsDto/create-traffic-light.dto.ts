import type { LocationDto } from "./location.dto";
import type { Mode } from "./mode.enum";

export interface CreateTrafficLightDto {

    location: LocationDto;

    mode: Mode;

    name: string;
}
