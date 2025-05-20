import { LocationDto } from "../dtos/location.dto";
import trafficLights from "../simulated-data/traffic-lights.simulation";

export class CarService {

  constructor() {
    this.simulateGoogleMapsRoute = this.simulateGoogleMapsRoute.bind(this);
  }

  simulateGoogleMapsRoute(origin: LocationDto, destination: LocationDto): LocationDto[] {
    const route: LocationDto[] = [];
    const steps = 50;
    
    const relevantTrafficLights = this.findTrafficLightsOnPath(origin, destination);
    
    const sortedWaypoints = this.sortWaypointsByDistance(origin, [
      origin,
      ...relevantTrafficLights,
      destination
    ]);
    
    const segments = sortedWaypoints.length - 1;
    const pointsPerSegment = Math.floor(steps / segments);
    
    for (let i = 0; i < segments; i++) {
      const start = sortedWaypoints[i];
      const end = sortedWaypoints[i + 1];
      
      for (let j = 0; j < pointsPerSegment; j++) {
        const progress = j / pointsPerSegment;
        const lat = start.latitude + (end.latitude - start.latitude) * progress;
        const lng = start.longitude + (end.longitude - start.longitude) * progress;
        
        const latVariation = (Math.random() - 0.5) * 0.0005;
        const lngVariation = (Math.random() - 0.5) * 0.0005;
        
        route.push({
          locationId: '',
          latitude: lat + latVariation,
          longitude: lng + lngVariation
        });
      }
    }
    
    route.push({ ...destination, locationId: '' });
    
    return route;
  }

  private findTrafficLightsOnPath(origin: LocationDto, destination: LocationDto): LocationDto[] {
    const relevantLights: LocationDto[] = [];
    const maxDistanceFromPath = 0.002;
    
    const m = (destination.latitude - origin.latitude) / 
              (destination.longitude - origin.longitude);
    const b = origin.latitude - m * origin.longitude;
    
    for (const tl of trafficLights) {
      const distance = this.distanceFromPointToLine(
        tl.location, 
        { locationId: '', latitude: m * tl.location.longitude + b, longitude: tl.location.longitude }
      );
      
      const isBetween = this.isBetween(
        tl.location.longitude, 
        Math.min(origin.longitude, destination.longitude),
        Math.max(origin.longitude, destination.longitude)
      );
      
      if (distance < maxDistanceFromPath && isBetween) {
        relevantLights.push(tl.location);
      }
    }
    
    return relevantLights;
  }

  private distanceBetween(point1: LocationDto, point2: LocationDto): number {
    const dx = point1.latitude - point2.latitude;
    const dy = point1.longitude - point2.longitude;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private distanceFromPointToLine(point: LocationDto, linePoint: LocationDto): number {
    return this.distanceBetween(point, linePoint);
  }

  private isBetween(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  private sortWaypointsByDistance(origin: LocationDto, waypoints: LocationDto[]): LocationDto[] {
    return [...waypoints].sort((a, b) => {
      const distA = this.distanceBetween(origin, a);
      const distB = this.distanceBetween(origin, b);
      return distA - distB;
    });
  }
}