export class TrafficLightUpdateMessage {
    pattern: string;
    data: {
        trafficLightId: string;
        color: 'RED' | 'YELLOW' | 'GREEN';
    };
}