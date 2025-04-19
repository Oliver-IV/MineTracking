import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { connect, MqttClient } from 'mqtt/*';

@Injectable()
export class MqttService implements OnModuleInit {

    private readonly logger = new Logger(MqttService.name);

    private client: MqttClient;

    onModuleInit() {
        this.client = connect('mqtt://localhost:1883');

        this.client.on('connect', () => {
            console.log('[MQTT] Conectado al broker');
        });

        this.client.on('error', (err) => {
            console.error('[MQTT] Error:', err);
        });
    }

    publicar(topic: string, mensaje: any) {
        const body = typeof mensaje === 'string' ? mensaje : JSON.stringify(mensaje);
        this.client.publish(topic, body);
    }
}
