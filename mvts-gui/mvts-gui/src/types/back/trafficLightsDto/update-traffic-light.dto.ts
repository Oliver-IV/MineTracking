import type { State } from "./state.enum";

export interface UpdateTrafficLightValidatedDto {

  trafficLightId: string;

  state: State;
}
