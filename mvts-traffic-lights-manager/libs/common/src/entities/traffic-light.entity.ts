import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { LocationEntity, Mode, State } from "@app/common";

@Entity("traffic_light")
export class TrafficLightEntity {

    @PrimaryColumn({ name : "traffic_light_id"})
    trafficLightId: string;

    @Column()
    name: string;

    @OneToOne(()=> LocationEntity,{cascade: true, eager:true})
    @JoinColumn({name : "location_id"})
    location: LocationEntity; 

    @Column({type: 'enum', enum: State})
    state : State;

    @Column({type: 'enum', enum: Mode })
    mode: Mode;
}
