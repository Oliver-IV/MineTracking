import { Router } from "express";
import { GETsimulationStatus, POSTstartSimulation, POSTstopSimulation } from "../controllers/simulation.controller";

const simulationRouter = Router() ;

simulationRouter.post('/start', (req, res) => {
    POSTstartSimulation(req, res);
}) ;

simulationRouter.post('/stop', (req, res) => {
    POSTstopSimulation(req, res);
}) ;

simulationRouter.get('/status', (req, res) => {
    GETsimulationStatus(req, res);
})

export default simulationRouter ;