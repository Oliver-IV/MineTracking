export class TrafficLightColorMessage {
    timestamp: string;
    trafficLightId: string;
    color: 'RED' | 'YELLOW' | 'GREEN';
}