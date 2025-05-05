import { IsEnum, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";
import { State } from "../type/traffic-lights";

export class ChangeLightStateValidatedDto {

    // @IsNotEmpty()
    @IsNumberString()
    @IsOptional()
    trafficLightId: string;

    @IsNotEmpty()
    @IsEnum(State)
    state: State;
}