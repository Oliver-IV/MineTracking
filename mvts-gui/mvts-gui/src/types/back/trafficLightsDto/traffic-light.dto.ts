import type { Mode } from "./mode.enum";
import type { State } from "./state.enum";

export interface TrafficLight {
  trafficLightId: string;
  name: string;
  location: Location | undefined;
  mode: Mode;
  state: State;
}