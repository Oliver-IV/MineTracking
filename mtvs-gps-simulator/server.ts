// app.ts - Aplicación principal

import express, { Request, Response } from 'express';
import http from 'http';
import * as amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";
import path from 'path';

// Tipos de datos
interface Location {
  latitude: number;
  longitude: number;
}

interface CarSimulation {
  active: boolean;
  currentLocation: Location;
  destination: Location | null;
  route: Location[];
  currentRouteIndex: number;
  speed: number; // km/h
  updateInterval: number; // milisegundos
  simulationId: string | null;
  intervalId: NodeJS.Timeout | null;
}

interface LocationMessage {
  timestamp: string;
  location: Location;
  carId: string;
}

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de RabbitMQ
const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const queueName = 'car_location_updates';

// Datos de simulación del carro
let carSimulation: CarSimulation = {
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
  intervalId: null
};

// Función para publicar la ubicación actual en RabbitMQ
async function publishLocationUpdate(location: Location): Promise<void> {
  try {
    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();
    
    await channel.assertQueue(queueName, { durable: true });
    
    const message: LocationMessage = {
      timestamp: new Date().toISOString(),
      location: location,
      carId: carSimulation.simulationId as string
    };
    
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify({
      pattern: 'car_location_updates',
      data: message
    })), {
      persistent: true
    });
    
    console.log(`Ubicación publicada: ${JSON.stringify(location)}`);
    
    setTimeout(() => {
      connection.close();
    }, 500);
    
  } catch (error) {
    console.error('Error al publicar en RabbitMQ:', error);
  }
}

function simulateGoogleMapsRoute(origin: Location, destination: Location): Location[] {
  const route: Location[] = [];
  const steps = 20;
  
  for (let i = 0; i <= steps; i++) {
    // Usa latitude/longitude en lugar de lat/lng
    const lat = origin.latitude + ((destination.latitude - origin.latitude) * i / steps);
    const lng = origin.longitude + ((destination.longitude - origin.longitude) * i / steps);
    
    const latVariation = (Math.random() - 0.5) * 0.01;
    const lngVariation = (Math.random() - 0.5) * 0.01;
    
    route.push({
      latitude: lat + latVariation,
      longitude: lng + lngVariation
    });
  }
  
  return route;
}

// Iniciar simulación del movimiento del carro
app.post('/api/simulation/start', (req:Request, res: Response) => {
  const { origin, destination } = req.body as { origin: Location, destination: Location };
  
  if (!origin || !destination) {
    res.status(400).json({ error: 'Se requieren origen y destino' });
    return ;
  }
  
  if (carSimulation.active) {
    res.status(400).json({ error: 'Ya hay una simulación en curso' });
    return ;
  }
  
  carSimulation.currentLocation = origin;
  carSimulation.destination = destination;
  carSimulation.route = simulateGoogleMapsRoute(origin, destination);
  carSimulation.currentRouteIndex = 0;
  carSimulation.active = true;
  carSimulation.simulationId = uuidv4();
  
  // Iniciar simulación con intervalos para actualizar la ubicación
  carSimulation.intervalId = setInterval(async () => {
    if (carSimulation.currentRouteIndex < carSimulation.route.length - 1) {
      carSimulation.currentRouteIndex++;
      carSimulation.currentLocation = carSimulation.route[carSimulation.currentRouteIndex];
      
      // Publicar la ubicación actual en RabbitMQ
      await publishLocationUpdate(carSimulation.currentLocation);
    } else {
      // Llegamos al destino, detener la simulación
      if (carSimulation.intervalId) {
        clearInterval(carSimulation.intervalId);
      }
      carSimulation.active = false;
      console.log('Simulación completada: Llegó al destino');
    }
  }, carSimulation.updateInterval);
  
  res.json({ 
    message: 'Simulación iniciada',
    simulationId: carSimulation.simulationId
  });
});

// Detener simulación
app.post('/api/simulation/stop', (req, res) => {
  if (!carSimulation.active) {
    res.status(400).json({ error: 'No hay simulación en curso' });
    return ;
  }
  
  if (carSimulation.intervalId) {
    clearInterval(carSimulation.intervalId);
  }
  carSimulation.active = false;
  
  res.json({ 
    message: 'Simulación detenida',
    simulationId: carSimulation.simulationId
  });
});

// Obtener estado actual de la simulación
app.get('/api/simulation/status', (req, res) => {
  res.json({
    active: carSimulation.active,
    currentLocation: carSimulation.currentLocation,
    destination: carSimulation.destination,
    progress: carSimulation.active ? 
      `${carSimulation.currentRouteIndex + 1}/${carSimulation.route.length}` : 
      null,
    simulationId: carSimulation.simulationId
  });
});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});