import type { State } from "./state.enum";

export interface ChangeLightStateDto {
    trafficLightId: string;
    state: State;
}