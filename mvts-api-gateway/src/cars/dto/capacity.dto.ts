import { IsEnum, IsIn, IsNotEmpty, IsNumberString, IsPositive } from "class-validator";
import { MeasurementUnit } from "../type/cars";

export class CapacityDto{
    
    @IsNumberString()
    capacityId: string;

    @IsEnum(MeasurementUnit,{message: "Invalid measurement unit"})
    measurementUnit: MeasurementUnit;

    @IsPositive({message: "Invalid value; must be positive"})
    value: number;
}