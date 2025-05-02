import { MeasurementUnit } from "../enums/measurement-unit.enum";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("capacity")
export class Capacity {

    @PrimaryColumn({ name:"capacity_id" })
    capacityId: string ;

    @Column({ name:"measurement_unit", nullable: false, enum: ["KG", "TON", "KTON"] })
    measurementUnit: MeasurementUnit;

    @Column({ name:"value" })
    value: number;
}