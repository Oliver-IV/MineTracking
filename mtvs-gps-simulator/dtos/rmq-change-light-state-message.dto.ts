import { State } from "./state.enum";

export class RMQChangeLightStateMessageDto {
    pattern: string;
    data: {
        trafficLightId: string;
        state: State;
    };
}