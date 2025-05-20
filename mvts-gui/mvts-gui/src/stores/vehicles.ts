import { defineStore } from 'pinia';
import mqtt from 'mqtt';
import type { LocationMessageDto } from '@/types/back/carRoute/location-message.dto';

export const useVehiclesStore = defineStore('vehicles', {
  state: () => ({
    vehicles: {} as Record<string, LocationMessageDto>,
    client: null as mqtt.MqttClient | null,
    connectionStatus: 'disconnected' as 'connected' | 'disconnected',
  }),
  actions: {
    connectMqtt() {
      const mqttConfig = {
        url: 'ws://localhost:9001',
        options: {
          username: 'mosquitto',
          password: 'compaoli123'
        },
        topics: ['cars/location']
      };

      this.client = mqtt.connect(mqttConfig.url, mqttConfig.options);

      this.client.on('connect', () => {
        this.connectionStatus = 'connected';
        mqttConfig.topics.forEach(topic => {
          this.client?.subscribe(topic);
        });
      });

      this.client.on('message', (topic, message) => {
        try {
          const data = JSON.parse(message.toString());
          if (topic === 'cars/location') {
            this.updateVehicle(data);
          }
        } catch (e) {
          console.error('Error parseando mensaje:', e);
        }
      });

      this.client.on('error', (error) => {
        this.connectionStatus = 'disconnected';
        console.error('MQTT error:', error);
      });
    },
    
    updateVehicle(data: LocationMessageDto) {
      const vehicleId = data.carId;
      this.vehicles = {
        ...this.vehicles,
        [vehicleId]: {
          ...data,
          timestamp: data.timestamp || new Date().toISOString()
        }
      };
    },
    
    disconnectMqtt() {
      if (this.client) {
        this.client.end();
        this.client = null;
        this.connectionStatus = 'disconnected';
      }
    }
  }
});