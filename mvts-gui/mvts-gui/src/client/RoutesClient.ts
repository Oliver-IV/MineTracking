import { HOST_NAME } from "@/configs/configs";
import type { CreateRouteDto } from "@/types/back/routeDto/create-route.dto";
import type { LocationDTO } from "@/types/back/routeDto/location.dto";
import type { RouteDto } from "@/types/back/routeDto/route.dto";

async function GETfindAllRoutes(): Promise<RouteDto[]> {
    try {
        const response = await fetch(`${HOST_NAME}/routes`, {
            method: 'GET',
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        return jsonResponse.routes;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}


async function GETfindAllLocations(): Promise<LocationDTO[]> {
    try {
        const response = await fetch(`${HOST_NAME}/routes/locations`, {
            method: 'GET',
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const jsonReponse = await response.json();
        console.log(jsonReponse)
        return jsonReponse.locations;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function POSTcreateRoute(route: CreateRouteDto): Promise<RouteDto> {
    try {
        const response = await fetch(`${HOST_NAME}/routes`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(route)
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const createdRoute: RouteDto = await response.json();
        return createdRoute;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function PATCHupdateRoute(routeId: string,locationIds: { startId: string, endId: string }) : Promise<RouteDto> {
    try {
        const route = {
            startId: "",
            endId: ""
        };
        if (!locationIds) {
            throw new Error("There are no locations to update");
        }
        if (locationIds.startId) {
            route.startId = locationIds.startId;
        }
        if (locationIds.endId) {
            route.endId = locationIds.endId;
        }
        const response = await fetch(`${HOST_NAME}/routes/${routeId}`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(route)
        });
        if (!response.ok) {
            throw new Error(`Error updating route`);
        }
        const updatedRoute: RouteDto = await response.json();
        return updatedRoute;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function DELETEdeleteRoute(routeId: string) {
    try {
        if (!routeId) {
            throw new Error("There is no location to delete");
        }
        const response = await fetch(`${HOST_NAME}/routes/${routeId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error deleting route`);
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
    
}

export { GETfindAllRoutes, GETfindAllLocations, POSTcreateRoute, PATCHupdateRoute, DELETEdeleteRoute }