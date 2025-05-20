import { HOST_NAME } from "@/configs/configs";
import type { CarDto } from "@/types/back/carDto/get-cart.dto";
import type { CreateCarDto } from "@/types/back/carDto/create-car.dto";


async function getAllCarts(): Promise<CarDto[]> {
    try {
        const response = await fetch(`${HOST_NAME}/cars`, {
            method: 'GET',
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        const jsonCarts = await response.json();
        const carts = jsonCarts.cars ;
        return carts;
    } catch (error) {
        throw new Error("Failed to get all carts");
    }
}


export async function createCar(car: CreateCarDto): Promise<CreateCarDto> {
    try {
        const response = await fetch(`${HOST_NAME}/cars`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        throw new Error("Failed to create car");
    }
}

export { getAllCarts }