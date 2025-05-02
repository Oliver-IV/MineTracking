import { Car, CreateCarDto } from "@app/common";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Capacity } from "@app/common/entities/capacity.entity";
import { CarEntity } from "@app/common/entities/car.entity";
import { CarType } from "@app/common/enums/car-type.enum";
import { MeasurementUnit } from "@app/common/enums/measurement-unit.enum";
import { State } from "@app/common/enums/state.enum";

@Injectable()
export class DtoConverter {
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

    carDtoToEntity(carDto: CreateCarDto, state: State, carId: string): CarEntity {
        const capacity = carDto.capacity;

        if(capacity === undefined){
            throw new BadRequestException('Capacity must be defined');
        }
        const measurementUnit = this.stringToMeasurement(capacity.measurementUnit);
        const capacityEntity: Capacity = {
            capacityId: capacity.capacityId,
            measurementUnit,
            value: capacity.value 
        };
        
        const car: CarEntity = {
            name: carDto.name,
            type: this.stringToCarType(carDto.type),
            state,
            carId,
            capacity: capacityEntity
        };
        return car;
    }

    carEntityToDto(carEntity: CarEntity): Car{
        const car: Car={
            ...carEntity
        }
        return car;
    }
}
