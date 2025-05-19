import { Route } from "../types/back/routeDto/get-route.dto"

async function GETfindAllRoutes() : Route[]{
    const response = await fetch(
        `${HOST_NAME}/routes`,
        {
            method: "GET"
        }
    ) ;
}

async function GETfindAllLocations() {

}

async function POSTcreateRoute() {

}

async function PATCHupdateRoute() {

}

async function DELETEdeleteRoute() {

}