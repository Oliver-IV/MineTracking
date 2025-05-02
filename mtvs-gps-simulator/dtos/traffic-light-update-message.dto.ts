export class TrafficLightUpdateMessageDto {
    pattern: string;
    data: {
        trafficLightId: string;
        color: 'RED' | 'YELLOW' | 'GREEN';
    };
}