import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("location")
export class LocationEntity {

    @PrimaryColumn({name: "location_id"})
    locationId : string;

    @Column()
    latitude: string;
    
    @Column()
    longitude: string;
}