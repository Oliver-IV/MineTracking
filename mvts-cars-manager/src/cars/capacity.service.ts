import { CapacityEntity, MeasurementUnit } from "@app/common";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CapacityService{
    constructor(@InjectRepository(CapacityEntity) private capacityRepository: Repository<CapacityEntity>) {}

    formatId(count: number, padding: number = 5): string {
        const nextId = count + 1;
        return nextId.toString().padStart(padding, '0');
    }

    async generateCapacityId(): Promise<string> {
        const count = await this.capacityRepository.count();
        return this.formatId(count);
    }

    async getCapacity(measurementUnit: MeasurementUnit, value: number): Promise<CapacityEntity | null>{
        const capacity = await this.capacityRepository.findOne({
            where:{
                measurementUnit,
                value
            }
        });
        return capacity;
    }

    async createCapacity(measurementUnit: MeasurementUnit, value: number): Promise<CapacityEntity>{
        const capacityId = await this.generateCapacityId();
        const capacity = this.capacityRepository.create({capacityId,measurementUnit,value});
        return await this.capacityRepository.save(capacity);
    }
}