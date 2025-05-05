import { Request, Response } from "express";
import { TrafficLightsService } from "../services/traffic-lights.service";
import trafficLights from "../simulated-data/traffic-lights.simulation";
import { State } from "../dtos/state.enum";

const trafficLightsService = new TrafficLightsService();

const { getInitialDelay, startTrafficLightCycle, stopTrafficLightCycle, publishTrafficLightUpdate, findAllTrafficLights, findTrafficLightById, changeTrafficLightColor } = trafficLightsService

function GETtrafficLights(req: Request, res: Response) {
    res.json(findAllTrafficLights());
}

function GETtrafficLightById(req: Request, res: Response) {
    const trafficLight = findTrafficLightById(req.params.id);
    if (!trafficLight) {
        res.status(404).json({ error: 'Semáforo no encontrado' });
        return;
    }

    res.json(trafficLight);
}

function POSTstopAllTrafficLights(req: Request, res: Response) {
    trafficLights.forEach(trafficLight => {
        if (trafficLight.active) {
            stopTrafficLightCycle(trafficLight.trafficLightId);
        }
    });

    res.json({ message: 'Simulación de semáforos detenida' });
}

function POSTchangeTrafficLightColor(req: Request, res: Response) {
    let { color } = req.body;
    color = State[color as keyof typeof State];
    const trafficLight = findTrafficLightById(req.params.id);

    if (!trafficLight) {
        res.status(404).json({ error: 'Semáforo no encontrado' });
        return;
    }

    changeTrafficLightColor(trafficLight.trafficLightId, color);

    res.json({
        message: `Color del semáforo actualizado a ${color}`,
        id: trafficLight.trafficLightId
    });
}

export { GETtrafficLights, GETtrafficLightById, POSTstopAllTrafficLights, POSTchangeTrafficLightColor };