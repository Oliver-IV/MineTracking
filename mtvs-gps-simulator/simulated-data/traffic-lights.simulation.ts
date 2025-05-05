import { v4 as uuidv4 } from 'uuid';
import { TrafficLightDto } from '../dtos/traffic-light.dto';
import { State } from '../dtos/state.enum';

const trafficLights: TrafficLightDto[] = [
    {
        trafficLightId: uuidv4(),
        location: {
            locationId: '1',
            latitude: 25.563531, // Punto intermedio en la ruta
            longitude: -108.461741
        },
        currentState: State.RED,
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
        trafficLightId: uuidv4(),
        location: {
            locationId: '2',
            latitude: 25.562734, // Punto intermedio en la ruta
            longitude: -108.463961
        },
        currentState: State.GREEN,
        cycleIntervals: {
            red: 25000,    // 25 segundos en rojo
            yellow: 5000,  // 5 segundos en amarillo
            green: 20000   // 20 segundos en verde
        },
        intervalId: null,
        active: false,
        radius: 50 // 50 metros de radio de influencia
    },
    {
        trafficLightId: uuidv4(),
        location: {
            locationId: '3',
            latitude: 25.561985, // Punto intermedio en la ruta
            longitude: -108.466180
        },
        currentState: State.GREEN,
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