import { RmqRecord, IncomingEvent } from '@nestjs/microservices';
import { RmqRecordBuilder } from '@nestjs/microservices/record-builders';

export class CustomRmqDeserializer {
    deserialize(message: any, options?: Record<string, any>): IncomingEvent {

        console.log('Mensaje recibido:', message);
        console.log('Opciones:', options);
        // console.log(`content: ${content}, properties: ${options}`)
        try {
            let content: Buffer;
            let messageOptions: any;
            if (message.content && Buffer.isBuffer(message.content)) {
                content = message.content;
                messageOptions = message.properties || {};
            } else {
                content = Buffer.from(typeof message === 'string' ? message : JSON.stringify(message));
                messageOptions = options || {};
            }

            if (!content) {
                console.error('Content es undefined o null');
                return {
                    pattern: 'error.pattern',
                    data: { error: 'Content is undefined' }
                };
            }
            const parsed = JSON.parse(content.toString());

            if (parsed.pattern && parsed.data) {
                return {
                    pattern: parsed.pattern,
                    data: parsed.data
                };
            }

            const pattern = messageOptions.headers?.['x-pattern'] || 'default.pattern';
            return {
                pattern: pattern,
                data: parsed
            };
        } catch (error) {
            console.error('Error deserializando mensaje:', error);

            return {
                pattern: options?.headers?.['x-pattern'] || 'default.pattern',
                data: {
                    error: 'Deserialization failed',
                    originalMessage: message,
                    errorMessage: error.message
                }
            };
        }
    }
}
