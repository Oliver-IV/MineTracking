import express from 'express';
import http from 'http';
import "dotenv/config";
import simulationRouter from './routers/simulation.router';
import trafficLightsRouter from './routers/traffic-lights.router';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/simulation", simulationRouter) ;
app.use("/api/traffic-lights", trafficLightsRouter) ;

server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});