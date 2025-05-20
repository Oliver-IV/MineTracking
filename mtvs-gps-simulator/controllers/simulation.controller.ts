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

    console.log(trafficLights);

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
    carSimulation.currentRouteIndex = 0;
    carSimulation.route = simulateGoogleMapsRoute(origin, destination);
    carSimulation.active = true;
    carSimulation.currentLocation = origin;
    carSimulation.destination = destination;

    simulations.push(carSimulation);

    // Iniciar todos los semáforos
    if (!trafficLightsSimulationStarted) {
        trafficLights.forEach(trafficLight => {
            startTrafficLightCycle(trafficLight);
        });
    }


    // Iniciar simulación con intervalos para actualizar la ubicación
    carSimulation.intervalId = setInterval(async () => {
        if (carSimulation.currentRouteIndex < carSimulation.route.length - 1) {
            // Verificar semáforos cercanos
            const nearRedLight = checkTrafficLights(carSimulation.currentLocation);

            if (nearRedLight && !carSimulation.isStopped) {
                // Detener el auto
                carSimulation.isStopped = true;
                await publishLocationUpdate(carSimulation.currentLocation, 0, 'STOPPED', carSimulation.car.carId);
            } else if (!nearRedLight) {
                // Mover el auto
                carSimulation.isStopped = false;
                carSimulation.currentRouteIndex++;
                carSimulation.currentLocation = carSimulation.route[carSimulation.currentRouteIndex];
                await publishLocationUpdate(carSimulation.currentLocation, carSimulation.speed, 'MOVING', carSimulation.car.carId);
            }
        } else {
            // Llegamos al destino, detener la simulación
            if (carSimulation.intervalId) {
                clearInterval(carSimulation.intervalId);
            }
            carSimulation.active = false;

            console.log('Simulación de vehiculo completada: Llegó al destino');
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

        // Detener todos los semáforos
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