import { Router } from "express";
import { GETtrafficLightById, GETtrafficLights, POSTchangeTrafficLightColor, POSTstopAllTrafficLights } from "../controllers/traffic-lights.controller";

const trafficLightsRouter = Router() ;

trafficLightsRouter.get('/', (req, res) => {
    GETtrafficLights(req, res);
}) ;

trafficLightsRouter.get('/:id', (req, res) => {
    GETtrafficLightById(req, res);
}) ;

trafficLightsRouter.post('/:id/set-color', (req, res) => {
    POSTchangeTrafficLightColor(req, res);
}) ;

trafficLightsRouter.post('/stop-all', (req, res) => {
    POSTstopAllTrafficLights(req, res);
}) ;

export default trafficLightsRouter ;