import { BadRequestException, Injectable } from "@nestjs/common";
import { 
    CarEntity, CapacityEntity,
    CarType, MeasurementUnit, State,
    Capacity, Car, CreateCarDto
 } from "@app/common";

@Injectable()
export class Converter {
    stringToCarType(type: string): CarType {
        const types = Object.values(CarType);
        if (types.includes(type as CarType)) {
            return type as CarType;
        }
        throw new BadRequestException('Invalid car type');
    }
    stringToState(state: string): State {
        const states = Object.values(State);
        if (states.includes(state as State)) {
            return state as State;
        }
        throw new BadRequestException('Invalid state');
    }

    stringToMeasurement(measurementUnit: string): MeasurementUnit{
        const units = Object.values(MeasurementUnit);
        if (units.includes(measurementUnit as MeasurementUnit)) {
            return measurementUnit as MeasurementUnit;
        }
        throw new BadRequestException('Invalid measurement unit');
    }

    capacityProtoToEntity(capacity: Capacity): CapacityEntity {
        const measurementUnit = this.stringToMeasurement(capacity.measurementUnit);
        const capacityEntity: CapacityEntity = {
            capacityId: capacity.capacityId,
            measurementUnit,
            value: capacity.value
        };
        return capacityEntity;
    }

    carDtoToEntity(carDto: CreateCarDto, state: State, carId: string): CarEntity {
        const {name, type, capacity} = carDto;
        if(capacity === undefined){
            throw new BadRequestException('Capacity must be defined');
        }

        const capacityEntity = this.capacityProtoToEntity(capacity);

        const car: CarEntity = {
            name,
            type: this.stringToCarType(type),
            state,
            carId,
            capacity: capacityEntity
        };
        return car;
    }

    carEntityToProto(carEntity: CarEntity): Car{
        const car: Car={
            ...carEntity
        }
        return car;
    }
}
