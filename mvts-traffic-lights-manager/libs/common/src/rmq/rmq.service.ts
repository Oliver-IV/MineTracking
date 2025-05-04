import { Injectable } from "@nestjs/common";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { RMQ_QUEUE_NAME, RMQ_URI } from "configs/rmq.config";

@Injectable()
export class RmqService {

    getOptions( noAck = false):RmqOptions{
        return {
            transport: Transport.RMQ,
            options: {
                urls: [RMQ_URI],
                queue: RMQ_QUEUE_NAME,
                noAck,
                persistent: true
            },
        };
    }
}