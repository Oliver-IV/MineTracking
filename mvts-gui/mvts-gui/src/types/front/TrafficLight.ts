export interface TrafficLight {
  id: string;
  trafficLightId: string;
  state: string; // 'RED' | 'YELLOW' | 'GREEN'
  active: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  cycleIntervals?: {
    red: number;
    yellow: number;
    green: number;
  };
  lastUpdate?: string;
}