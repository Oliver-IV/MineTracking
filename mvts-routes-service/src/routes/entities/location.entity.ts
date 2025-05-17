import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as crypto from 'crypto';

@Entity('location')
export class Location {
    
    @PrimaryColumn({name: 'locationId'})
    locationId: string;

    @Column({name: 'name', nullable: false, unique: true})
    name: string;

    @Column({name: 'latitude', type: 'double precision', nullable: false})
    latitude: number;

    @Column({name: 'longitude', type: 'double precision', nullable: false})
    longitude: number;

    @BeforeInsert()
    generateUid() {
        this.locationId = crypto.randomUUID() ;
    }
}