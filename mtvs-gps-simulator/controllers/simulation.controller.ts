import { Request, Response } from "express";
import { CarService } from "../services/cars.service";
import { LocationService } from "../services/location.service";
import { TrafficLightsService } from "../services/traffic-lights.service";
import trafficLights from "../simulated-data/traffic-lights.simulation";
import { LocationDto } from "../dtos/location.dto";
import { v4 as uuidv4 } from 'uuid';
import { TrafficLightsConsumer } from "../consumers/traffic-lights.consumer";
import { CarDto } from "../dtos/car.dto";
import { CarSimulationDto } from "../dtos/car-simulation.dto";
import { simulations } from "../simulated-data/cars.simulation";
// import {EventLocationService} from "../services/event-location.service";

// var event : EventLocationService;
const carService = new CarService();
const locationService = new LocationService();
const trafficLightsService = new TrafficLightsService();
const trafficLightsConsumer = new TrafficLightsConsumer(trafficLightsService);
var trafficLightsSimulationStarted = false;

const { simulateGoogleMapsRoute } = carService;
const { calculateDistance, checkTrafficLights, publishLocationUpdate, } = locationService;
const { startTrafficLightCycle, stopTrafficLightCycle, findAllTrafficLights } = trafficLightsService;

async function POSTstartSimulation(req: Request, res: Response) {
    const { origin, destination, car } = req.body as { origin: LocationDto, destination: LocationDto, car: CarDto };

    trafficLightsConsumer.start();

    const dbTrafficLights = await findAllTrafficLights();
    dbTrafficLights.forEach(trafficLight => {
        trafficLights.push(trafficLight);
    });

    if (!origin || !destination) {
        res.status(400).json({ error: 'Se requieren origen y destino' });
        return;
    }

    const carSimulation = new CarSimulationDto();
    carSimulation.car = car;
    carSimulation.speed = 40;
    carSimulation.updateInterval = 1000;
    carSimulation.isStopped = false;
    carSimulation.intervalId = null;
    carSimulation.simulationId = uuidv4();
    carSimulation.route = simulateGoogleMapsRoute(origin, destination);
    carSimulation.active = true;
    carSimulation.currentLocation = origin;
    carSimulation.destination = destination;
    carSimulation.currentRouteIndex = 0;

    simulations.push(carSimulation);

    if (!trafficLightsSimulationStarted) {
        trafficLights.forEach(trafficLight => {
            startTrafficLightCycle(trafficLight);
        });
        trafficLightsSimulationStarted = true;
    }

    carSimulation.intervalId = setInterval(async () => {
        if (!carSimulation.active) {
            clearInterval(carSimulation.intervalId!);
            return;
        }

        const nextIndex = carSimulation.currentRouteIndex + 1;
        if (nextIndex >= carSimulation.route.length) {
            carSimulation.active = false;
            clearInterval(carSimulation.intervalId!);
            await publishLocationUpdate(carSimulation.currentLocation, 0, 'STOPPED', carSimulation.car.carId);
            console.log('Simulación de vehículo completada: Llegó al destino');
            return;
        }
        
        const nextLocation = carSimulation.route[nextIndex];
        
        const { shouldStop, nearestLight } = checkTrafficLights(
            carSimulation.currentLocation, 
            nextLocation
        );
        
        if (shouldStop && !carSimulation.isStopped) {
            carSimulation.isStopped = true;
            await publishLocationUpdate(carSimulation.currentLocation, 0, 'STOPPED', carSimulation.car.carId);
            console.log(`Vehículo ${carSimulation.car.carId} detenido por semáforo ${nearestLight?.trafficLightId}`);
        } else if (!shouldStop && carSimulation.isStopped) {
            carSimulation.isStopped = false;
            carSimulation.currentRouteIndex++;
            carSimulation.currentLocation = carSimulation.route[carSimulation.currentRouteIndex];
            // await event.emitLocationUpdate(carSimulation.currentLocation,carSimulation.speed,'MOVING',carSimulation.car.carId);
            await publishLocationUpdate(carSimulation.currentLocation, carSimulation.speed, 'MOVING', carSimulation.car.carId);
        } else if (!carSimulation.isStopped) {
            carSimulation.currentRouteIndex++;
            carSimulation.currentLocation = carSimulation.route[carSimulation.currentRouteIndex];
            // await event.emitLocationUpdate(carSimulation.currentLocation,carSimulation.speed,'MOVING',carSimulation.car.carId);
            await publishLocationUpdate(carSimulation.currentLocation, carSimulation.speed, 'MOVING', carSimulation.car.carId);
        }
    }, carSimulation.updateInterval);

    res.json({
        message: 'Simulación iniciada',
        simulationId: carSimulation.simulationId
    });
}

function POSTstopSimulation(req: Request, res: Response) {
    const simulationId = req.params.id;
    const carSimulation = simulations.find(simulation => simulation.simulationId === simulationId);
    if (carSimulation) {
        if (!carSimulation.active) {
            res.status(400).json({ error: 'No hay simulación en curso' });
            return;
        }

        if (carSimulation.intervalId) {
            clearInterval(carSimulation.intervalId);
        }

        trafficLightsConsumer.stop();

        carSimulation.active = false;

        trafficLights.forEach(trafficLight => {
            stopTrafficLightCycle(trafficLight.trafficLightId);
        });

        res.json({
            message: 'Simulación detenida',
            simulationId: carSimulation.simulationId
        });
    } else {
        res.status(404).json({ error: 'Simulación no encontrada' });
    }

}

function GETsimulationStatus(req: Request, res: Response) {
    const simulationId = req.params.id;
    const carSimulation = simulations.find(simulation => simulation.simulationId === simulationId);
    if (!carSimulation) {
        res.status(404).json({ error: 'Simulación no encontrada' });
        return;
    }
    res.json({
        active: carSimulation.active,
        currentLocation: carSimulation.currentLocation,
        destination: carSimulation.destination,
        progress: carSimulation.active ?
            `${carSimulation.currentRouteIndex + 1}/${carSimulation.route.length}` :
            null,
        simulationId: carSimulation.simulationId,
        isStopped: carSimulation.isStopped
    });
}

export { POSTstartSimulation, POSTstopSimulation, GETsimulationStatus };