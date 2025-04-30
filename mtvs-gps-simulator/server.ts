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
  isStopped: boolean;
}

interface LocationMessage {
  timestamp: string;
  location: Location;
  carId: string;
  speed: number;
  status: 'MOVING' | 'STOPPED';
}

interface TrafficLight {
  id: string;
  location: Location;
  currentColor: 'RED' | 'YELLOW' | 'GREEN';
  cycleIntervals: {
    red: number;
    yellow: number;
    green: number;
  };
  intervalId: NodeJS.Timeout | null;
  active: boolean;
  radius: number; // Radio de influencia en metros
}

interface TrafficLightColorMessage {
  timestamp: string;
  trafficLightId: string;
  color: 'RED' | 'YELLOW' | 'GREEN';
}

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de RabbitMQ
const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const carQueueName = 'car_location_updates';
const trafficLightQueueName = 'traffic_lights_color_updates';

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
  intervalId: null,
  isStopped: false
};

// Datos de simulación de semáforos
const trafficLights: TrafficLight[] = [
  {
    id: uuidv4(),
    location: {
      latitude: 19.4325, // Punto intermedio en la ruta
      longitude: -99.1335
    },
    currentColor: 'RED',
    cycleIntervals: {
      red: 20000,    // 20 segundos en rojo
      yellow: 5000,  // 5 segundos en amarillo
      green: 15000   // 15 segundos en verde
    },
    intervalId: null,
    active: false,
    radius: 50 // 50 metros de radio de influencia
  },
  {
    id: uuidv4(),
    location: {
      latitude: 19.4328, // Punto intermedio en la ruta
      longitude: -99.1338
    },
    currentColor: 'GREEN',
    cycleIntervals: {
      red: 25000,    // 25 segundos en rojo
      yellow: 5000,  // 5 segundos en amarillo
      green: 20000   // 20 segundos en verde
    },
    intervalId: null,
    active: false,
    radius: 50 // 50 metros de radio de influencia
  }
];

// Función para calcular distancia entre dos puntos en metros (aproximación)
function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = loc1.latitude * Math.PI/180;
  const φ2 = loc2.latitude * Math.PI/180;
  const Δφ = (loc2.latitude - loc1.latitude) * Math.PI/180;
  const Δλ = (loc2.longitude - loc1.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

// Función para verificar si el auto está cerca de un semáforo en rojo
function checkTrafficLights(carLocation: Location): boolean {
  for (const trafficLight of trafficLights) {
    if (trafficLight.currentColor === 'RED' || trafficLight.currentColor === 'YELLOW') {
      const distance = calculateDistance(carLocation, trafficLight.location);
      if (distance <= trafficLight.radius) {
        return true; // Hay un semáforo en rojo/amarillo cerca
      }
    }
  }
  return false; // No hay semáforos en rojo/amarillo cerca
}

// Función para publicar la ubicación actual en RabbitMQ
async function publishLocationUpdate(location: Location, speed: number, status: 'MOVING' | 'STOPPED'): Promise<void> {
  try {
    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();
    
    await channel.assertQueue(carQueueName, { durable: true });
    
    const message: LocationMessage = {
      timestamp: new Date().toISOString(),
      location: location,
      carId: carSimulation.simulationId as string,
      speed: speed,
      status: status
    };
    
    channel.sendToQueue(carQueueName, Buffer.from(JSON.stringify({
      pattern: 'car_location_updates',
      data: message
    })), {
      persistent: true
    });
    
    console.log(`Ubicación publicada: ${JSON.stringify(message)}`);
    
    setTimeout(() => {
      connection.close();
    }, 500);
    
  } catch (error) {
    console.error('Error al publicar en RabbitMQ:', error);
  }
}

// Función para publicar la actualización de color del semáforo en RabbitMQ
async function publishTrafficLightUpdate(trafficLight: TrafficLight): Promise<void> {
  try {
    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();
    
    await channel.assertQueue(trafficLightQueueName, { durable: true });
    
    const message: TrafficLightColorMessage = {
      timestamp: new Date().toISOString(),
      trafficLightId: trafficLight.id,
      color: trafficLight.currentColor
    };
    
    channel.sendToQueue(trafficLightQueueName, Buffer.from(JSON.stringify({
      pattern: 'traffic_lights_color_updates',
      data: trafficLight
    })), {
      persistent: true
    });
    
    console.log(`Actualización de semáforo publicada: ID=${trafficLight.id}, Color=${trafficLight.currentColor}`);
    
    setTimeout(() => {
      connection.close();
    }, 500);
    
  } catch (error) {
    console.error('Error al publicar actualización de semáforo en RabbitMQ:', error);
  }
}

function simulateGoogleMapsRoute(origin: Location, destination: Location): Location[] {
  const route: Location[] = [];
  const steps = 20;
  
  // Asegurarnos de que la ruta pase por los semáforos
  const waypoints = [...trafficLights.map(tl => tl.location)];
  waypoints.unshift(origin);
  waypoints.push(destination);
  
  // Generar puntos entre cada waypoint
  for (let w = 0; w < waypoints.length - 1; w++) {
    const start = waypoints[w];
    const end = waypoints[w + 1];
    
    for (let i = 0; i < steps / (waypoints.length - 1); i++) {
      const progress = i / (steps / (waypoints.length - 1));
      const lat = start.latitude + (end.latitude - start.latitude) * progress;
      const lng = start.longitude + (end.longitude - start.longitude) * progress;
      
      const latVariation = (Math.random() - 0.5) * 0.001;
      const lngVariation = (Math.random() - 0.5) * 0.001;
      
      route.push({
        latitude: lat + latVariation,
        longitude: lng + lngVariation
      });
    }
  }
  
  return route;
}

// Ciclo de vida del semáforo
function startTrafficLightCycle(trafficLight: TrafficLight) {
  if (trafficLight.active) return;
  
  trafficLight.active = true;
  
  // Función para ciclar por los colores del semáforo
  const cycleColor = async () => {
    switch (trafficLight.currentColor) {
      case 'RED':
        trafficLight.currentColor = 'GREEN';
        await publishTrafficLightUpdate(trafficLight);
        trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.green);
        break;
      case 'GREEN':
        trafficLight.currentColor = 'YELLOW';
        await publishTrafficLightUpdate(trafficLight);
        trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.yellow);
        break;
      case 'YELLOW':
        trafficLight.currentColor = 'RED';
        await publishTrafficLightUpdate(trafficLight);
        trafficLight.intervalId = setTimeout(cycleColor, trafficLight.cycleIntervals.red);
        break;
    }
  };
  
  // Publicar estado inicial y comenzar el ciclo
  publishTrafficLightUpdate(trafficLight).then(() => {
    trafficLight.intervalId = setTimeout(cycleColor, getInitialDelay(trafficLight));
  });
}

// Determina el retraso inicial basado en el color actual
function getInitialDelay(trafficLight: TrafficLight): number {
  switch (trafficLight.currentColor) {
    case 'RED': return trafficLight.cycleIntervals.red;
    case 'YELLOW': return trafficLight.cycleIntervals.yellow;
    case 'GREEN': return trafficLight.cycleIntervals.green;
    default: return 0;
  }
}

function stopTrafficLightCycle(trafficLightId: string) {
  const trafficLight = trafficLights.find(tl => tl.id === trafficLightId);
  if (trafficLight && trafficLight.active) {
    trafficLight.active = false;
    if (trafficLight.intervalId) {
      clearTimeout(trafficLight.intervalId);
      trafficLight.intervalId = null;
    }
  }
}

// Iniciar simulación del movimiento del carro
app.post('/api/simulation/start', (req: Request, res: Response) => {
  const { origin, destination } = req.body as { origin: Location, destination: Location };
  
  if (!origin || !destination) {
    res.status(400).json({ error: 'Se requieren origen y destino' });
    return;
  }
  
  if (carSimulation.active) {
    res.status(400).json({ error: 'Ya hay una simulación en curso' });
    return;
  }
  
  // Iniciar todos los semáforos
  trafficLights.forEach(trafficLight => {
    startTrafficLightCycle(trafficLight);
  });
  
  carSimulation.currentLocation = origin;
  carSimulation.destination = destination;
  carSimulation.route = simulateGoogleMapsRoute(origin, destination);
  carSimulation.currentRouteIndex = 0;
  carSimulation.active = true;
  carSimulation.simulationId = uuidv4();
  carSimulation.isStopped = false;
  
  // Iniciar simulación con intervalos para actualizar la ubicación
  carSimulation.intervalId = setInterval(async () => {
    if (carSimulation.currentRouteIndex < carSimulation.route.length - 1) {
      // Verificar semáforos cercanos
      const nearRedLight = checkTrafficLights(carSimulation.currentLocation);
      
      if (nearRedLight && !carSimulation.isStopped) {
        // Detener el auto
        carSimulation.isStopped = true;
        await publishLocationUpdate(carSimulation.currentLocation, 0, 'STOPPED');
      } else if (!nearRedLight) {
        // Mover el auto
        carSimulation.isStopped = false;
        carSimulation.currentRouteIndex++;
        carSimulation.currentLocation = carSimulation.route[carSimulation.currentRouteIndex];
        await publishLocationUpdate(carSimulation.currentLocation, carSimulation.speed, 'MOVING');
      }
    } else {
      // Llegamos al destino, detener la simulación
      if (carSimulation.intervalId) {
        clearInterval(carSimulation.intervalId);
      }
      carSimulation.active = false;
      
      // Detener todos los semáforos
      trafficLights.forEach(trafficLight => {
        stopTrafficLightCycle(trafficLight.id);
      });
      
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
    return;
  }
  
  if (carSimulation.intervalId) {
    clearInterval(carSimulation.intervalId);
  }
  carSimulation.active = false;
  
  // Detener todos los semáforos
  trafficLights.forEach(trafficLight => {
    stopTrafficLightCycle(trafficLight.id);
  });
  
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
    simulationId: carSimulation.simulationId,
    isStopped: carSimulation.isStopped
  });
});

// API para semáforos
// Obtener todos los semáforos
app.get('/api/traffic-lights', (req, res) => {
  res.json(trafficLights.map(tl => ({
    id: tl.id,
    location: tl.location,
    currentColor: tl.currentColor,
    active: tl.active,
    radius: tl.radius
  })));
});

// Obtener un semáforo específico
app.get('/api/traffic-lights/:id', (req, res) => {
  const trafficLight = trafficLights.find(tl => tl.id === req.params.id);
  if (!trafficLight) {
    res.status(404).json({ error: 'Semáforo no encontrado' });
    return;
  }
  
  res.json({
    id: trafficLight.id,
    location: trafficLight.location,
    currentColor: trafficLight.currentColor,
    active: trafficLight.active,
    radius: trafficLight.radius
  });
});

// Iniciar simulación de semáforos
app.post('/api/traffic-lights/start-all', (req, res) => {
  trafficLights.forEach(trafficLight => {
    if (!trafficLight.active) {
      startTrafficLightCycle(trafficLight);
    }
  });
  
  res.json({ message: 'Simulación de semáforos iniciada' });
});

// Detener todos los semáforos
app.post('/api/traffic-lights/stop-all', (req, res) => {
  trafficLights.forEach(trafficLight => {
    if (trafficLight.active) {
      stopTrafficLightCycle(trafficLight.id);
    }
  });
  
  res.json({ message: 'Simulación de semáforos detenida' });
});

// Cambiar manualmente el color de un semáforo
app.post('/api/traffic-lights/:id/set-color', (req, res) => {
  const { color } = req.body as { color: 'RED' | 'YELLOW' | 'GREEN' };
  const trafficLight = trafficLights.find(tl => tl.id === req.params.id);
  
  if (!trafficLight) {
    res.status(404).json({ error: 'Semáforo no encontrado' });
    return;
  }
  
  if (!['RED', 'YELLOW', 'GREEN'].includes(color)) {
    res.status(400).json({ error: 'Color inválido. Debe ser RED, YELLOW o GREEN' });
    return;
  }
  
  trafficLight.currentColor = color;
  publishTrafficLightUpdate(trafficLight);
  
  res.json({ 
    message: `Color del semáforo actualizado a ${color}`,
    id: trafficLight.id
  });
});

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});