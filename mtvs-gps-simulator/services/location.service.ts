import { carQueueName, rabbitMqUrl } from "../configs/rabbitmq.config";
import { LocationMessageDto } from "../dtos/location-message.dto";
import { LocationDto } from "../dtos/location.dto";
import { State } from "../dtos/state.enum";
import carSimulation from "../simulated-data/cars.simulation";
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

    checkTrafficLights(carLocation: LocationDto): boolean {
        for (const trafficLight of trafficLights) {
            if (trafficLight.currentState === State.RED || trafficLight.currentState === State.YELLOW) {
                const distance = this.calculateDistance(carLocation, trafficLight.location);
                if (distance <= trafficLight.radius) {
                    return true; // Hay un semáforo en rojo/amarillo cerca
                }
            }
        }
        return false; // No hay semáforos en rojo/amarillo cerca
    }

    async publishLocationUpdate(location: LocationDto, speed: number, status: 'MOVING' | 'STOPPED'): Promise<void> {
        try {
            const connection = await amqp.connect(rabbitMqUrl);
            const channel = await connection.createChannel();

            await channel.assertQueue(carQueueName, { durable: true });

            const message: LocationMessageDto = {
                timestamp: new Date().toISOString(),
                location: location,
                carId: carSimulation.simulationId as string,
                speed: speed,
                status: status
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