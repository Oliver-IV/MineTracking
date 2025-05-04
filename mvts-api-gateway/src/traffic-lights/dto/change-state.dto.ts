import { IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { State } from "../type/traffic-lights";

export class ChangeLightStateValidatedDto{
    
    @IsNotEmpty()
    @IsNumberString()
    trafficLightId: string;
    
    @IsNotEmpty()
    @IsEnum(State)
    state: State;
}