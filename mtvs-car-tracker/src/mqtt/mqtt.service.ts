import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import MQTT_URL from 'src/configs/mqtt.config';

@Injectable()
export class MqttService implements OnModuleInit {

    private readonly logger = new Logger(MqttService.name);

    private client: MqttClient;

    onModuleInit() {
        this.client = connect(MQTT_URL);

        this.client.on('connect', () => {
            this.logger.log('[MQTT] Conectado al broker');
        });

        this.client.on('error', (err) => {
            console.error('[MQTT] Error:', err);
        });
    }

    publish(topic: string, mensaje: any) {
        const body = typeof mensaje === 'string' ? mensaje : JSON.stringify(mensaje);
        this.client.publish(topic, body);
    }
}
