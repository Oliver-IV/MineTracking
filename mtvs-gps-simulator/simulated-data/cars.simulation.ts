import { CarSimulationDto } from "../dtos/car-simulation.dto";

const carSimulation: CarSimulationDto = {
    active: false,
    currentLocation: {
        locationId: '',
        latitude: 25.564878, // Guasave como punto de inicio por defecto
        longitude: -108.457834
    },
    destination: null,
    route: [],
    currentRouteIndex: 0,
    speed: 60, // km/h
    updateInterval: 1000, // milisegundos
    simulationId: null,
    intervalId: null,
    isStopped: false
};

export default carSimulation;