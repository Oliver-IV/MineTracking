import { LocationDto } from "./location.dto";
import { Mode } from "./mode.enum";

export class CreatedTrafficLightValidatedDto {
    location: LocationDto;
    mode: Mode;
    name: string;
}
