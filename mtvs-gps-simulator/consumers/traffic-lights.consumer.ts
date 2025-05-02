import { rabbitMqUrl, trafficLightChangeQueueName, trafficLightQueueName } from "../configs/rabbitmq.config";
import * as amqp from 'amqplib';
import { TrafficLightDto } from "../dtos/traffic-light.dto";
import { TrafficLightsService } from "../services/traffic-lights.service";
import { TrafficLightUpdateMessageDto as TrafficLightUpdateMessageDto } from "../dtos/traffic-light-update-message.dto";

export class TrafficLightsConsumer {

    private channel: amqp.Channel | null = null;
    private connection: amqp.ChannelModel | null = null;
    private trafficLightsService: TrafficLightsService;

    constructor(trafficLightsService: TrafficLightsService) {
        this.trafficLightsService = trafficLightsService;
        this.initializeConsumer = this.initializeConsumer.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    async start(): Promise<void> {
        try {
            await this.initializeConsumer();
            console.log('TrafficLightsConsumer iniciado correctamente');
        } catch (error) {
            console.error('Error al iniciar TrafficLightsConsumer:', error);
            throw error;
        }
    }

    async stop(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close();
                this.channel = null;
            }
            if (this.connection) {
                await this.connection.close();
                this.connection = null;
            }
            console.log('TrafficLightsConsumer detenido correctamente');
        } catch (error) {
            console.error('Error al detener TrafficLightsConsumer:', error);
            throw error;
        }
    }

    private async initializeConsumer(): Promise<void> {
        try {
            this.connection = await amqp.connect(rabbitMqUrl);
            this.channel = await this.connection.createChannel();

            // Configurar reconexión automática
            this.connection.on('close', () => {
                console.log('Conexión RabbitMQ perdida. Intentando reconectar...');
                setTimeout(() => this.initializeConsumer(), 5000);
            });

            await this.channel.assertQueue(trafficLightChangeQueueName, { durable: true });

            console.log(`Esperando mensajes en la cola: ${trafficLightChangeQueueName}`);

            this.channel.consume(trafficLightChangeQueueName, this.handleMessage, { noAck: false });
        } catch (error) {
            console.error('Error al inicializar el consumidor:', error);
            setTimeout(() => this.initializeConsumer(), 5000);
            throw error;
        }
    }

    private async handleMessage(msg: amqp.ConsumeMessage | null): Promise<void> {
        if (!msg) return;

        try {
            const content = JSON.parse(msg.content.toString()) as TrafficLightUpdateMessageDto;

            // Validar el mensaje recibido
            if (!content.data || !content.data.trafficLightId || !content.data.color) {
                console.error('Mensaje con formato incorrecto recibido:', content);
                this.channel?.nack(msg, false, false);
                return;
            }

            const { trafficLightId, color } = content.data;

            console.log(`Mensaje recibido - ID: ${trafficLightId}, Color: ${color}`);

            // Actualizar el semáforo usando el servicio
            const result = this.trafficLightsService.changeTrafficLightColor(trafficLightId, color);
            
            if (result.error) {
                console.error(`Error al actualizar semáforo: ${result.error}`);
                this.channel?.nack(msg, false, false);
                return;
            }

            // Confirmar procesamiento del mensaje
            this.channel?.ack(msg);
            console.log(`Semáforo actualizado correctamente: ${trafficLightId}`);

        } catch (error) {
            console.error('Error al procesar mensaje:', error);
            this.channel?.nack(msg, false, false);
        }
    }
}