import { Controller } from '@nestjs/common';
import { RoutesService } from './services/routes.service';
import { CreateRouteDTO, CreateRouteResponse, DeleteRouteDTO, DeleteRouteResponse, EmptyMessage, FindAllRoutesResponse, RoutesServiceController, RoutesServiceControllerMethods, UpdateRouteDTO, UptateRouteResponse } from './protos/routes';
import { Observable } from 'rxjs';

@Controller()
@RoutesServiceControllerMethods()
export class RoutesController implements RoutesServiceController {

  constructor(private readonly routesService: RoutesService) {}
  async createRoute(request: CreateRouteDTO): Promise<CreateRouteResponse> {
    return await this.routesService.createRoute(request);
  }
  async findAllRoutes(request: EmptyMessage): Promise<FindAllRoutesResponse> {
    return await this.routesService.findAllRoutes(request);
  }
  async updateRoute(request: UpdateRouteDTO): Promise<UptateRouteResponse> {
    return await this.routesService.updateRoute(request);
  }
  async deleteRoute(request: DeleteRouteDTO): Promise<DeleteRouteResponse> {
    return await this.routesService.deleteRoute(request);
  }

}
