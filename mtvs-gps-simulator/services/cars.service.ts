import { LocationDto } from "../dtos/location.dto";
import trafficLights from "../simulated-data/traffic-lights.simulation";

export class CarService {
    
    simulateGoogleMapsRoute(origin: LocationDto, destination: LocationDto): LocationDto[] {
        const route: LocationDto[] = [];
        const steps = 20;
        
        // Asegurarnos de que la ruta pase por los semáforos
        const waypoints = [...trafficLights.map(tl => tl.location)];
        waypoints.unshift(origin);
        waypoints.push(destination);
        
        // Generar puntos entre cada waypoint
        for (let w = 0; w < waypoints.length - 1; w++) {
          const start = waypoints[w];
          const end = waypoints[w + 1];
          
          for (let i = 0; i < steps / (waypoints.length - 1); i++) {
            const progress = i / (steps / (waypoints.length - 1));
            const lat = start.latitude + (end.latitude - start.latitude) * progress;
            const lng = start.longitude + (end.longitude - start.longitude) * progress;
            
            const latVariation = (Math.random() - 0.5) * 0.001;
            const lngVariation = (Math.random() - 0.5) * 0.001;
            
            route.push({
              locationId: '' ,
              latitude: lat + latVariation,
              longitude: lng + lngVariation
            });
          }
        }
        
        return route;
      }

}