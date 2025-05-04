import { LocationEntity } from "@app/common";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LocationService{
    constructor(@InjectRepository(LocationEntity) private locationRepository: Repository<LocationEntity>) {
    }

    async findById(locationId: string): Promise<LocationEntity|null>{
        try {
            const location: LocationEntity | null=  await this.locationRepository.findOne(
                { 
                    where: {locationId}
                }
            );
            return location;
        } catch (error) {
            console.log('Error while fetching location: ',error);
            throw new InternalServerErrorException('Somenthing went wrong while looking for location');
        }
    }

    async findByCoordinates(latitude: string, longitude: string): Promise<LocationEntity|null>{
        try {
            const location: LocationEntity | null= await this.locationRepository.findOne(
                { 
                    where: { 
                        latitude,
                        longitude
                    }
                });
            return location;
        } catch (error) {
            console.log('Error while fetching location: ',error);
            throw new InternalServerErrorException('Somenthing went wrong while looking for location');
        }
    }
}