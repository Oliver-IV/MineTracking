export class LocationDto {
    locationId: string = '' ;
    latitude: number;
    longitude: number;

    constructor(locationId: string, latitude: number, longitude: number) {
        this.locationId = locationId;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}