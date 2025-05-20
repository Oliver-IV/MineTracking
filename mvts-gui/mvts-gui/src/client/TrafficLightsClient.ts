import { HOST_NAME } from "@/configs/configs";
import type { CreateTrafficLightDto } from "@/types/back/trafficLightsDto/create-traffic-light.dto";
import type { TrafficLight } from "@/types/back/trafficLightsDto/traffic-light.dto";
import type { UpdateTrafficLightDto } from "@/types/back/trafficLightsDto/update-traffic-light.dto";

async function POSTcreateTrafficLight(createTrafficLightDto: CreateTrafficLightDto) {
    try {
        const response = await fetch(`${HOST_NAME}/trafficLights`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createTrafficLightDto),
        });
        if (!response.ok) {
            throw new Error("Error connecting to the server");;
        }
        const trafficLight : TrafficLight = await response.json();
        return trafficLight;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function GETgetAllTrafficLights() {
    try {
        const response = await fetch(`${HOST_NAME}/trafficLights`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Error connecting to the server");;
        }
        const trafficLights : TrafficLight[] = await response.json();
        return trafficLights;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function DELETEdeleteTrafficLight(trafficLightId: string) {
    try {
        const response = await fetch(`${HOST_NAME}/trafficLights/ ${trafficLightId}`, {
            method: "DELETE",
            credentials: "include",
        }) ;
        if (!response.ok) {
            throw new Error("Error connecting to the server");;
        }
        const trafficLight : TrafficLight = await response.json();
        return trafficLight;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function PATCHupdateTrafficLight(trafficLightId: string, updateTrafficLightDto: UpdateTrafficLightDto) {
    try {
        const response = await fetch(`${HOST_NAME}/trafficLights/${trafficLightId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateTrafficLightDto),
        }) ;
        if (!response.ok) {
            throw new Error("Error connecting to the server");
        }
        return response.json();
    } catch (error) {
         console.error("Error: ", error) ;
        throw error;
    }
}

async function PATCHupdateTrafficLightState(trafficLightId: string, updateTrafficLightDto: UpdateTrafficLightDto) {
    try {
        const response = await fetch(`${HOST_NAME}/trafficLights/${trafficLightId}/state`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateTrafficLightDto),
        }) ;
        if (!response.ok) {
            throw new Error("Error connecting to the server");
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

export { POSTcreateTrafficLight, GETgetAllTrafficLights, DELETEdeleteTrafficLight, PATCHupdateTrafficLight, PATCHupdateTrafficLightState };