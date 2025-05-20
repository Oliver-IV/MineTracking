import type { CapacityDto } from './capacity.dto';
import type { CarType } from './cart.type';
import type { State } from './state';
export interface CreateCarDto {
    name: string;
    capacity: CapacityDto
    type: CarType,
    state: State
}   