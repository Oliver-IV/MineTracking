import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "../entities/location.entity";

@Injectable()
export class LocationService {

    constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) {}

    async findAllLocations(): Promise<Location[]> {
        return await this.locationRepository.find();
    }

    async createLocation(location: Location): Promise<Location> {
        return await this.locationRepository.save(location);
    }

    async findLocationById(locationId: string): Promise<Location> {
        const location = await this.locationRepository.findOne({where: {locationId: locationId}});
        if(!location) {
            throw new Error('Location not found');
        }
        return location;
    }

    async findLocationByName(locationName: string): Promise<Location> {
        const location = await this.locationRepository.findOne({where: {name: locationName}});
        if(!location) {
            throw new Error('Location not found');
        }
        return location;
    }

}