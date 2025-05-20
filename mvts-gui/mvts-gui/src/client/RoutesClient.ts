import { HOST_NAME } from "@/configs/configs";
import type { CreateRouteDto } from "@/types/back/routeDto/create-route.dto";
import type { LocationDTO } from "@/types/back/routeDto/location.dto";
import type { Route } from "@/types/front/Route";

async function GETfindAllRoutes(): Promise<Route[]> {
    try {
        const response = await fetch(`${HOST_NAME}/routes`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const routes: Route[] = await response.json();
        return routes;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}


async function GETfindAllLocations(): Promise<LocationDTO[]> {
    try {
        const response = await fetch(`${HOST_NAME}/routes/locations`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const locations: LocationDTO[] = await response.json();
        return locations;
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function POSTcreateRoute(route: CreateRouteDto): Promise<Route> {
    try {
        const response = await fetch(`${HOST_NAME}/routes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(route)
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function PATCHupdateRoute(routeId: string,locationIds: { startId: string, endId: string }) {
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(route)
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
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
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
    
}

export { GETfindAllRoutes, GETfindAllLocations, POSTcreateRoute, PATCHupdateRoute, DELETEdeleteRoute }