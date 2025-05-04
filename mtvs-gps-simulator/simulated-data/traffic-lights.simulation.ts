import { v4 as uuidv4 } from 'uuid';
import { TrafficLightDto } from '../dtos/traffic-light.dto';

const trafficLights: TrafficLightDto[] = [
    {
        id: uuidv4(),
        location: {
            latitude: 19.4325, // Punto intermedio en la ruta
            longitude: -99.1335
        },
        currentColor: 'RED',
        cycleIntervals: {
            red: 20000,    // 20 segundos en rojo
            yellow: 5000,  // 5 segundos en amarillo
            green: 15000   // 15 segundos en verde
        },
        intervalId: null,
        active: false,
        radius: 50 // 50 metros de radio de influencia
    },
    {
        id: uuidv4(),
        location: {
            latitude: 19.4328, // Punto intermedio en la ruta
            longitude: -99.1338
        },
        currentColor: 'GREEN',
        cycleIntervals: {
            red: 25000,    // 25 segundos en rojo
            yellow: 5000,  // 5 segundos en amarillo
            green: 20000   // 20 segundos en verde
        },
        intervalId: null,
        active: false,
        radius: 50 // 50 metros de radio de influencia
    }
];

export default trafficLights;