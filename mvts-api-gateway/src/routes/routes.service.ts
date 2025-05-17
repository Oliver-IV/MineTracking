import { Inject, Injectable } from '@nestjs/common';
import { CreateRouteResponse, DeleteRouteResponse, FindAllRoutesResponse, ROUTES_SERVICE_NAME, ROUTES_SERVICE_PACKAGE_NAME, RoutesServiceClient, UptateRouteResponse } from './protos/routes';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRouteDto } from './dto/create-route.dto';
import { lastValueFrom } from 'rxjs';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
    private routesService: RoutesServiceClient; // Mantenemos el cliente gRPC internamente

    constructor(
        @Inject(ROUTES_SERVICE_PACKAGE_NAME) private client: ClientGrpc
    ) { }

    onModuleInit() {
        this.routesService = this.client.getService<RoutesServiceClient>(ROUTES_SERVICE_NAME);
    }

    async createRoute(routeDto: CreateRouteDto): Promise<CreateRouteResponse> {
        return await lastValueFrom(this.routesService.createRoute({
            start: {
                name: routeDto.start.name,
                latitude: routeDto.start.latitude,
                longitude: routeDto.start.longitude
            },
            end: {
                name: routeDto.end.name,
                latitude: routeDto.end.latitude,
                longitude: routeDto.end.longitude
            }
        }));
    }
    async findAllRoutes(): Promise<FindAllRoutesResponse> {
        return await lastValueFrom(this.routesService.findAllRoutes({}));
    }
    async updateRoute(routeId: string, routeDto: UpdateRouteDto): Promise<UptateRouteResponse> {
        return await lastValueFrom(this.routesService.updateRoute({
            routeId: routeId,
            start: {
                name: routeDto?.start?.name,
                latitude: routeDto?.start?.latitude,
                longitude: routeDto?.start?.longitude
            },
            end: {
                name: routeDto?.end?.name,
                latitude: routeDto?.end?.latitude,
                longitude: routeDto?.end?.longitude
            }
        }));
    }
    async deleteRoute(routeId: string): Promise<DeleteRouteResponse> {
        return await lastValueFrom(this.routesService.deleteRoute({routeId: routeId}));
    }
}
