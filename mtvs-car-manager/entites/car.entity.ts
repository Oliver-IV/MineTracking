import { CarType } from "../enums/car-type.enum";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Capacity } from "./capacity.entity";
import { State } from "../enums/state.enum";

@Entity("car")
export class Car {

    @PrimaryColumn({ name:"car_id" } )
    carId: string

    @Column({ name:"name", nullable: false })
    name: string

    @Column({ name:"type", enum: ["HEAVY", "LIGHT", "MEDIUM"], nullable: false })
    type: CarType

    @Column({ name:"state", enum: ["AVAILABLE", "UNAVAILABLE", "ON_ROUTE"], nullable: false })
    state: State

    @ManyToOne(() => Capacity)
    capacity: Capacity
}