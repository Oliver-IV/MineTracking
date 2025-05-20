import { defineStore } from 'pinia';
import mqtt from 'mqtt';
import type { TrafficLight } from '@/types/front/TrafficLight';

export const useTrafficLightsStore = defineStore('trafficLights', {
  state: () => ({
    trafficLights: {} as Record<string, TrafficLight>,
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
        topics: ['traffic_lights/color']
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
          if (topic === 'traffic_lights/color') {
            this.updateTrafficLight(data);
          }
        } catch (e) {
          console.error('Error parseando mensaje:', e);
        }
      });

      this.client.on('error', (error) => {
        this.connectionStatus = 'disconnected';
      });
    },
    updateTrafficLight(data: any) {
      const tlId = data.trafficLightId;
      this.trafficLights = {
        ...this.trafficLights,
        [tlId]: {
          ...data,
          id: tlId,
          state: this.getLightStateString(data.state),
          lastUpdate: data.lastUpdate,
        }
      };
    },
    getLightStateString(state: number): string {
      switch (state) {
        case 0: return 'RED';
        case 1: return 'YELLOW';
        case 2: return 'GREEN';
        default: return 'UNKNOWN';
      }
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