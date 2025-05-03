import { IsIn, IsNotEmpty, IsNumberString, IsPositive } from "class-validator";

export class CapacityDto{
    
    @IsNumberString()
    capacityId: string;

    @IsIn(["kg","ton","kton"],{message: "Invalid measurement unit"})
    measurementUnit: string;

    @IsPositive({message: "Invalid value; must be positive"})
    value: number;
}