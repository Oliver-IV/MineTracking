import { CarSimulationDto } from "../dtos/car-simulation.dto";

const carSimulation: CarSimulationDto = {
    active: false,
    currentLocation: {
        latitude: 19.4326, // Ciudad de México como punto de inicio por defecto
        longitude: -99.1332
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