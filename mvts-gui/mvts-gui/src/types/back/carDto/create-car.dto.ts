import type { CapacityDto } from './capacity.dto';
import type { CarType } from './cart.type';
export interface CreateCarDto {

    name: string;
    capacity: CapacityDto
    type: CarType
}   