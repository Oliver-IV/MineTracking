import { rabbitMqUrl, trafficLightQueueName } from "../configs/rabbitmq.config";
import { TrafficLightColorMessageDto } from "../dtos/traffic-light-color-message.dto";
import { TrafficLightDto } from "../dtos/traffic-light.dto";
import * as amqp from 'amqplib';
import trafficLights from "../simulated-data/traffic-lights.simulation";
import { State } from "../dtos/state.enum";
import { Empty, TrafficLights, TrafficLightsServiceClient } from "../generated/traffic-lights";
import { GRPC_URL } from "../configs/grpc.configs";
import { ChannelCredentials, ServiceError } from "@grpc/grpc-js";
import { LocationDto } from "../dtos/location.dto";
import * as fs from 'fs';
import { join } from "path";

export class TrafficLightsService {

    private trafficLightsClient: TrafficLightsServiceClient;

    constructor() {
        this.initGrpcClient();
        this.startTrafficLightCycle = this.startTrafficLightCycle.bind(this);
        this.publishTrafficLightUpdate = this.publishTrafficLightUpdate.bind(this);
        this.findAllTrafficLights = this.findAllTrafficLights.bind(this);
    }

    private initGrpcClient() {
        try {
            const certOptions = {
                cert: fs.readFileSync(join(process.cwd(), '/services/certs/server.crt')),
                key: fs.readFileSync(join(process.cwd(), '/services/certs/server.key.decrypted'))
            };
            this.trafficLightsClient = new TrafficLightsServiceClient(GRPC_URL,
                ChannelCredentials.createSsl(
                    null,
                    certOptions.key,
                    certOptions.cert,
                    { checkServerIdentity: () => undefined, rejectUnauthorized: false }
                )
            );
            console.log(`Conectado al servidor gRPC en ${GRPC_URL}`);
        } catch (error) {
            console.error('Error al inicializar el cliente gRPC:', error);
        }
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
        const cycleColor = async () => {
            switch (trafficLight.currentState) {
                case State.RED:
                    trafficLight.currentState = State.GREEN;
                    trafficLight.lastUpdate = new Date().toString().split('GMT')[0].trim();;
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.green);
                    break;
                case State.GREEN:
                    trafficLight.currentState = State.YELLOW;
                    trafficLight.lastUpdate = new Date().toString().split('GMT')[0].trim();;
                    await this.publishTrafficLightUpdate(trafficLight);
                    trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.yellow);
                    break;
                case State.YELLOW:
                    trafficLight.currentState = State.RED;
                    trafficLight.lastUpdate = new Date().toString().split('GMT')[0].trim();;
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

    // findAllTrafficLights() {
    //     return trafficLights.map(tl => ({
    //         id: tl.trafficLightId,
    //         location: tl.location,
    //         currentColor: tl.currentState,
    //         active: tl.active,
    //         radius: tl.radius
    //     }));
    // }

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

    findAllTrafficLights(): Promise<TrafficLightDto[]> {
        console.log("aaaaa");
        console.log(this?.trafficLightsClient);
        return new Promise((resolve, reject) => {
            this.trafficLightsClient.findAllTrafficLights(
                Empty,
                (error: ServiceError | null, response: TrafficLights) => {
                    if (error) {
                        console.error('Error en findAllTrafficLights:', error.message);
                        reject(new Error(`gRPC error: ${error.message}`));
                        return;
                    }

                    const trafficLights: TrafficLightDto[] = [];

                    response.trafficLights.forEach(tl => {
                        if (tl.location) {
                            const location = new LocationDto(
                                tl.location.locationId,
                                Number(tl.location.latitude),
                                Number(tl.location.longitude)
                            );

                            const randomState: State = Math.floor(Math.random() * 3) as State;

                            trafficLights.push(new TrafficLightDto(
                                tl.trafficLightId,
                                location,
                                randomState,
                                {
                                    red: 20000,
                                    yellow: 3000,
                                    green: 15000
                                },
                                null,
                                false,
                                50
                            ));
                        }
                    });

                    resolve(trafficLights);
                }
            );
        });
    }
}
