import { rabbitMqUrl, trafficLightQueueName } from "../configs/rabbitmq.config";
import { TrafficLightColorMessageDto } from "../dtos/traffic-light-color-message.dto";
import { TrafficLightDto } from "../dtos/traffic-light.dto";
import * as amqp from 'amqplib';
import trafficLights from "../simulated-data/traffic-lights.simulation";
import { State } from "../dtos/state.enum";

export class TrafficLightsService {

    constructor() {
        this.startTrafficLightCycle = this.startTrafficLightCycle.bind(this);
        this.publishTrafficLightUpdate = this.publishTrafficLightUpdate.bind(this);
    }

    async publishTrafficLightUpdate(trafficLight: TrafficLightDto): Promise<void> {
        try {
            const connection = await amqp.connect(rabbitMqUrl);
            const channel = await connection.createChannel();

            await channel.assertQueue(trafficLightQueueName, { durable: true });

            
            const message: TrafficLightColorMessageDto = {
                timestamp: new Date().toISOString(),
                trafficLightId: trafficLight.trafficLightId,
                state: trafficLight.currentState
            };

            channel.sendToQueue(trafficLightQueueName, Buffer.from(JSON.stringify({
                pattern: 'traffic_lights_color_updates',
                data: trafficLight
            })), {
                persistent: true
            });

            console.log(`Actualización de semáforo publicada: ID=${trafficLight.trafficLightId}, Color=${trafficLight.currentState}`);

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
            switch (trafficLight.currentState) {
                case State.RED:
                    trafficLight.currentState = State.GREEN;
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.green);
                    break;
                case State.GREEN:
                    trafficLight.currentState = State.YELLOW;
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.yellow);
                    break;
                case State.YELLOW:
                    trafficLight.currentState = State.RED;
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.red);
                    break;
            }
        };

        this.publishTrafficLightUpdate(trafficLight).then(() => {
            trafficLight.intervalId = setTimeout(cycleColor, this.getInitialDelay(trafficLight));
        });
    }

    getInitialDelay(trafficLight: TrafficLightDto): number {
        switch (trafficLight.currentState) {
            case State.RED: return trafficLight.cycleIntervals.red;
            case State.YELLOW: return trafficLight.cycleIntervals.yellow;
            case State.GREEN: return trafficLight.cycleIntervals.green;
            default: return 0;
        }
    }

    stopTrafficLightCycle(trafficLightId: string) {
        const trafficLight = trafficLights.find(tl => tl.trafficLightId === trafficLightId);
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
            id: tl.trafficLightId,
            location: tl.location,
            currentColor: tl.currentState,
            active: tl.active,
            radius: tl.radius
        }));
    }

    findTrafficLightById(id: string) {
        return trafficLights.find(tl => tl.trafficLightId === id);
    }

    changeTrafficLightColor(trafficLightId: string, state: State) {
        const trafficLight = trafficLights.find(tl => tl.trafficLightId === trafficLightId);
        if (!trafficLight) {
            return { error: 'Semáforo no encontrado' };
        }

        trafficLight.currentState = state;
        this.publishTrafficLightUpdate(trafficLight);

        return {
            message: `Color del semáforo actualizado a ${state}`,
            id: trafficLight.trafficLightId
        };
    }

}