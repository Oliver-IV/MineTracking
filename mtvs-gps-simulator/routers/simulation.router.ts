import { Router } from "express";
import { GETsimulationStatus, POSTstartSimulation, POSTstopSimulation } from "../controllers/simulation.controller";

const simulationRouter = Router() ;

simulationRouter.post('/start', async (req, res) => {
    await POSTstartSimulation(req, res);
}) ;

simulationRouter.post('/stop/:id', (req, res) => {
    POSTstopSimulation(req, res);
}) ;

simulationRouter.get('/status:id', (req, res) => {
    GETsimulationStatus(req, res);
})

export default simulationRouter ;