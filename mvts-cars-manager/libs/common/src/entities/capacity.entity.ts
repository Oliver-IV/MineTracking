// import { MeasurementUnit } from "@app/common/enums/measurement-unit.enum";
import { MeasurementUnit } from "../types";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("capacity")
export class CapacityEntity {

    @PrimaryColumn({ name:"capacity_id" })
    capacityId: string ;

    @Column({ type: 'enum', name:"measurement_unit", nullable: false, enum: MeasurementUnit })
    measurementUnit: MeasurementUnit;

    @Column({ name:"value" })
    value: number;
}
