import { LocationDto } from "../dtos/location.dto";
import trafficLights from "../simulated-data/traffic-lights.simulation";

export class CarService {

  constructor() {
    this.simulateGoogleMapsRoute = this.simulateGoogleMapsRoute.bind(this);
  }

  /**
   * Simula una ruta similar a Google Maps que solo considera los semáforos en el camino directo
   * entre el origen y el destino.
   * @param origin Punto de inicio
   * @param destination Punto de destino
   * @returns Array de LocationDto que representa la ruta
   */
  simulateGoogleMapsRoute(origin: LocationDto, destination: LocationDto): LocationDto[] {
    const route: LocationDto[] = [];
    const steps = 50; // Número total de puntos en la ruta
    
    // 1. Encontrar semáforos que están en el camino entre origen y destino
    const relevantTrafficLights = this.findTrafficLightsOnPath(origin, destination);
    
    // 2. Ordenar los semáforos por proximidad al origen
    const sortedWaypoints = this.sortWaypointsByDistance(origin, [
      origin,
      ...relevantTrafficLights,
      destination
    ]);
    
    // 3. Generar puntos entre cada waypoint
    const segments = sortedWaypoints.length - 1;
    const pointsPerSegment = Math.floor(steps / segments);
    
    for (let i = 0; i < segments; i++) {
      const start = sortedWaypoints[i];
      const end = sortedWaypoints[i + 1];
      
      // Generar puntos para este segmento
      for (let j = 0; j < pointsPerSegment; j++) {
        const progress = j / pointsPerSegment;
        const lat = start.latitude + (end.latitude - start.latitude) * progress;
        const lng = start.longitude + (end.longitude - start.longitude) * progress;
        
        // Pequeña variación aleatoria para hacer la ruta más natural
        const latVariation = (Math.random() - 0.5) * 0.0005;
        const lngVariation = (Math.random() - 0.5) * 0.0005;
        
        route.push({
          locationId: '',
          latitude: lat + latVariation,
          longitude: lng + lngVariation
        });
      }
    }
    
    // Asegurarnos de llegar exactamente al destino
    route.push({ ...destination, locationId: '' });
    
    return route;
  }

  /**
   * Encuentra los semáforos que están cerca del camino directo entre origen y destino
   * @param origin Punto de inicio
   * @param destination Punto de destino
   * @returns Array de LocationDto de semáforos relevantes
   */
  private findTrafficLightsOnPath(origin: LocationDto, destination: LocationDto): LocationDto[] {
    const relevantLights: LocationDto[] = [];
    const maxDistanceFromPath = 0.002; // ~200 metros en grados decimales
    
    // Calcular la ecuación de la línea entre origen y destino (y = mx + b)
    const m = (destination.latitude - origin.latitude) / 
              (destination.longitude - origin.longitude);
    const b = origin.latitude - m * origin.longitude;
    
    // Verificar cada semáforo
    for (const tl of trafficLights) {
      // Calcular distancia perpendicular del semáforo a la línea
      const distance = this.distanceFromPointToLine(
        tl.location, 
        { locationId: '', latitude: m * tl.location.longitude + b, longitude: tl.location.longitude }
      );
      
      // Verificar si el semáforo está entre origen y destino en la dirección x
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

  /**
   * Calcula la distancia entre dos puntos
   */
  private distanceBetween(point1: LocationDto, point2: LocationDto): number {
    const dx = point1.latitude - point2.latitude;
    const dy = point1.longitude - point2.longitude;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calcula la distancia de un punto a una línea
   */
  private distanceFromPointToLine(point: LocationDto, linePoint: LocationDto): number {
    return this.distanceBetween(point, linePoint);
  }

  /**
   * Verifica si un valor está entre otros dos valores
   */
  private isBetween(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  /**
   * Ordena los waypoints por distancia al origen
   */
  private sortWaypointsByDistance(origin: LocationDto, waypoints: LocationDto[]): LocationDto[] {
    return [...waypoints].sort((a, b) => {
      const distA = this.distanceBetween(origin, a);
      const distB = this.distanceBetween(origin, b);
      return distA - distB;
    });
  }
}