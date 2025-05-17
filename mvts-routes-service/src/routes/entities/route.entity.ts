import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Location } from "./location.entity";

@Entity("routes")
export class Route {

    @PrimaryColumn({name: 'routeId'})
    routeId: string;

    @ManyToOne(() => Location)
    start: Location;

    @ManyToOne(() => Location)
    end: Location;

}
