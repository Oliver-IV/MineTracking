// import { CarType,State } from "../enums";
import { CarType,State} from "../types";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CapacityEntity } from "./capacity.entity";

@Entity("car")
export class CarEntity {

    @PrimaryColumn({ name:"car_id" } )
    carId: string

    @Column({ name:"name", nullable: false })
    name: string

    @Column({ type: 'enum', name:"type", enum: CarType, nullable: false })
    type: CarType

    @Column({type: 'enum', name:"state", enum: State, nullable: false })
    state: State

    @ManyToOne(() => CapacityEntity, {eager: true})
    @JoinColumn({name : 'capacity_id'})
    capacity: CapacityEntity
}