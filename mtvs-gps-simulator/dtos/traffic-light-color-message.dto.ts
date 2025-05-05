import { State } from "./state.enum";

export class TrafficLightColorMessageDto {
  timestamp: string;
  trafficLightId: string;
  state: State;
}