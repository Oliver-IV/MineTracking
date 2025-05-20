import type { CapacityDto } from './capacity.dto';
import type { CarType } from './cart.type';
export interface CarDto {
    id: string;
    name: string;
    capacity: CapacityDto
    type: CarType
}   