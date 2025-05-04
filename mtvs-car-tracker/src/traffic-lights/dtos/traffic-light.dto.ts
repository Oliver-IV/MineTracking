import { LocationDto } from "src/cars/dtos/location.dto";

export class TrafficLightDto {
    id: string;
    location: LocationDto;
    currentColor: 'RED' | 'YELLOW' | 'GREEN';
    cycleIntervals: {
      red: number;
      yellow: number;
      green: number;
    };
    intervalId: NodeJS.Timeout | null;
    active: boolean;
  }