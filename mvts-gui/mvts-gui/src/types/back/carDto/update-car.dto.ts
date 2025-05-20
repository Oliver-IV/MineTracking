import type { CarType } from "./cart.type";

export interface UpdateCarDto {
    carId: string;
    state: CarType
}