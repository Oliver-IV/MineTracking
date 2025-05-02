import { rabbitMqUrl, trafficLightQueueName } from "../configs/rabbitmq.config";
import { TrafficLightColorMessageDto } from "../dtos/traffic-light-color-message.dto";
import { TrafficLightDto } from "../dtos/traffic-light.dto";
import * as amqp from 'amqplib';
import trafficLights from "../simulated-data/traffic-lights.simulation";

export class TrafficLightsService {

    async publishTrafficLightUpdate(trafficLight: TrafficLightDto): Promise<void> {
        try {
            const connection = await amqp.connect(rabbitMqUrl);
            const channel = await connection.createChannel();

            await channel.assertQueue(trafficLightQueueName, { durable: true });

            const message: TrafficLightColorMessageDto = {
                timestamp: new Date().toISOString(),
                trafficLightId: trafficLight.id,
                color: trafficLight.currentColor
            };

            channel.sendToQueue(trafficLightQueueName, Buffer.from(JSON.stringify({
                pattern: 'traffic_lights_color_updates',
                data: trafficLight
            })), {
                persistent: true
            });

            console.log(`Actualización de semáforo publicada: ID=${trafficLight.id}, Color=${trafficLight.currentColor}`);

            setTimeout(() => {
                connection.close();
            }, 500);

        } catch (error) {
            console.error('Error al publicar actualización de semáforo en RabbitMQ:', error);
        }
    }

    startTrafficLightCycle(trafficLight: TrafficLightDto) {
        if (trafficLight.active) return;

        trafficLight.active = true;

        // Función para ciclar por los colores del semáforo
        const cycleColor = async () => {
            switch (trafficLight.currentColor) {
                case 'RED':
                    trafficLight.currentColor = 'GREEN';
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.green);
                    break;
                case 'GREEN':
                    trafficLight.currentColor = 'YELLOW';
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.yellow);
                    break;
                case 'YELLOW':
                    trafficLight.currentColor = 'RED';
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.red);
                    break;
            }
        };

        // Use arrow function here as well to preserve 'this' context
        this.publishTrafficLightUpdate(trafficLight).then(() => {
            trafficLight.intervalId = setTimeout(cycleColor, this.getInitialDelay(trafficLight));
        });
    }

    getInitialDelay(trafficLight: TrafficLightDto): number {
        switch (trafficLight.currentColor) {
            case 'RED': return trafficLight.cycleIntervals.red;
            case 'YELLOW': return trafficLight.cycleIntervals.yellow;
            case 'GREEN': return trafficLight.cycleIntervals.green;
            default: return 0;
        }
    }

    stopTrafficLightCycle(trafficLightId: string) {
        const trafficLight = trafficLights.find(tl => tl.id === trafficLightId);
        if (trafficLight && trafficLight.active) {
            trafficLight.active = false;
            if (trafficLight.intervalId) {
                clearTimeout(trafficLight.intervalId);
                trafficLight.intervalId = null;
            }
        }
    }

    findAllTrafficLights() {
        return trafficLights.map(tl => ({
            id: tl.id,
            location: tl.location,
            currentColor: tl.currentColor,
            active: tl.active,
            radius: tl.radius
        }));
    }

    findTrafficLightById(id: string) {
        return trafficLights.find(tl => tl.id === id);
    }

    changeTrafficLightColor(trafficLightId: string, color: 'RED' | 'YELLOW' | 'GREEN') {
        const trafficLight = trafficLights.find(tl => tl.id === trafficLightId);
        if (!trafficLight) {
            return { error: 'Semáforo no encontrado' };
        }

        if (!['RED', 'YELLOW', 'GREEN'].includes(color)) {
            return { error: 'Color inválido. Debe ser RED, YELLOW o GREEN' };
        }

        trafficLight.currentColor = color;
        this.publishTrafficLightUpdate(trafficLight);

        return {
            message: `Color del semáforo actualizado a ${color}`,
            id: trafficLight.id
        };
    }

}