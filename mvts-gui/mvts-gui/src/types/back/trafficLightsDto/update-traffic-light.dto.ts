import type { State } from "./state.enum";

export interface UpdateTrafficLightDto {

  trafficLightId: string;

  state: State;
}
