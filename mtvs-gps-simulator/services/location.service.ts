import { carQueueName, rabbitMqUrl } from "../configs/rabbitmq.config";
import { LocationMessageDto } from "../dtos/location-message.dto";
import { LocationDto } from "../dtos/location.dto";
import { State } from "../dtos/state.enum";
import { TrafficLightDto } from "../dtos/traffic-light.dto";
import { simulations } from "../simulated-data/cars.simulation";
import trafficLights from "../simulated-data/traffic-lights.simulation";
import * as amqp from 'amqplib';

export class LocationService {

    constructor() {
        this.checkTrafficLights = this.checkTrafficLights.bind(this);
        this.calculateDistance = this.calculateDistance.bind(this);
        this.publishLocationUpdate = this.publishLocationUpdate.bind(this);
    }

    calculateDistance(loc1: LocationDto, loc2: LocationDto): number {
        const R = 6371e3; // Radio de la Tierra en metros
        const φ1 = loc1.latitude * Math.PI / 180;
        const φ2 = loc2.latitude * Math.PI / 180;
        const Δφ = (loc2.latitude - loc1.latitude) * Math.PI / 180;
        const Δλ = (loc2.longitude - loc1.longitude) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    checkTrafficLights(carLocation: LocationDto, carDirection?: LocationDto): { shouldStop: boolean, nearestLight?: TrafficLightDto } {
        let shouldStop = false;
        let nearestLight: TrafficLightDto | undefined;
        let minDistance = Infinity;

        for (const trafficLight of trafficLights) {
            if (trafficLight.currentState === State.RED || trafficLight.currentState === State.YELLOW) {
                const distance = this.calculateDistance(carLocation, trafficLight.location);
                
                if (!carDirection || this.isInDirection(carLocation, carDirection, trafficLight.location)) {
                    if (distance <= trafficLight.radius && distance < minDistance) {
                        shouldStop = true;
                        nearestLight = trafficLight;
                        minDistance = distance;
                    }
                }
            }
        }

        return { shouldStop, nearestLight };
    }

    private isInDirection(currentLocation: LocationDto, nextLocation: LocationDto, trafficLightLocation: LocationDto): boolean {
        
        const dxVehicle = nextLocation.longitude - currentLocation.longitude;
        const dyVehicle = nextLocation.latitude - currentLocation.latitude;
        
        const dxToLight = trafficLightLocation.longitude - currentLocation.longitude;
        const dyToLight = trafficLightLocation.latitude - currentLocation.latitude;
        
        const dotProduct = dxVehicle * dxToLight + dyVehicle * dyToLight;
        
        return dotProduct > 0;
    }
    async publishLocationUpdate(location: LocationDto, speed: number, status: 'MOVING' | 'STOPPED', carId: string): Promise<void> {
        try {
            const connection = await amqp.connect(rabbitMqUrl);
            const channel = await connection.createChannel();

            await channel.assertQueue(carQueueName, { durable: true });

            const simulation = simulations.find(simulation => simulation.car.carId === carId);

            const message: LocationMessageDto = {
                timestamp: new Date().toISOString(),
                location: location,
                carId: carId,
                speed: speed,
                status: status,
                car: simulation?.car
            };

            channel.sendToQueue(carQueueName, Buffer.from(JSON.stringify({
                pattern: 'car_location_updates',
                data: message
            })), {
                persistent: true
            });

            console.log(`Ubicación publicada: ${JSON.stringify(message)}`);

            setTimeout(() => {
                connection.close();
            }, 500);

        } catch (error) {
            console.error('Error al publicar en RabbitMQ:', error);
        }
    }

}