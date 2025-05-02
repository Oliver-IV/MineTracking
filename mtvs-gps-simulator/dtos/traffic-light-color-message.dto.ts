export class TrafficLightColorMessageDto {
  timestamp: string;
  trafficLightId: string;
  color: 'RED' | 'YELLOW' | 'GREEN';
}