import { Capacity, CapacityEntity, MeasurementUnit } from "@app/common";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CapacityService{
    constructor(@InjectRepository(CapacityEntity) private capacityRepository: Repository<CapacityEntity>) {}

    async getCapacity(measurementUnit: MeasurementUnit, value: number): Promise<CapacityEntity | null>{
        const capacity = await this.capacityRepository.findOne({
            where:{
                measurementUnit,
                value
            }
        });
        return capacity;
    }

    async createCapacity(capacity: Capacity): Promise<CapacityEntity>{
        const entity = this.capacityRepository.create(capacity);
        return await this.capacityRepository.save(entity);
    }
}