import { Request, Response } from "express";
import { TrafficLightsService } from "../services/traffic-lights.service";
import trafficLights from "../simulated-data/traffic-lights.simulation";

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
            stopTrafficLightCycle(trafficLight.id);
        }
    });

    res.json({ message: 'Simulación de semáforos detenida' });
}

function POSTchangeTrafficLightColor(req: Request, res: Response) {
    const { color } = req.body as { color: 'RED' | 'YELLOW' | 'GREEN' };
    const trafficLight = findTrafficLightById(req.params.id);

    if (!trafficLight) {
        res.status(404).json({ error: 'Semáforo no encontrado' });
        return;
    }

    if (!['RED', 'YELLOW', 'GREEN'].includes(color)) {
        res.status(400).json({ error: 'Color inválido. Debe ser RED, YELLOW o GREEN' });
        return;
    }

    changeTrafficLightColor(trafficLight.id, color);

    res.json({
        message: `Color del semáforo actualizado a ${color}`,
        id: trafficLight.id
    });
}

export { GETtrafficLights, GETtrafficLightById, POSTstopAllTrafficLights, POSTchangeTrafficLightColor };