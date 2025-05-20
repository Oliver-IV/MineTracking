import { MeasurementUnit } from './measurement-unit';

export interface CapacityDto {
    capacityId: string;
    measurementUnit: MeasurementUnit;
    value: number
}