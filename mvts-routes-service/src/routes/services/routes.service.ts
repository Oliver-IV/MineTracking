import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../entities/route.entity';
import { Repository } from 'typeorm';
import { CreateRouteDTO, CreateRouteResponse, DeleteRouteDTO, DeleteRouteResponse, EmptyMessage, FindAllRoutesResponse, UpdateRouteDTO, UptateRouteResponse } from '../protos/routes';
import { LocationService } from './location.service';

@Injectable()
export class RoutesService {

  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
    private readonly locationService: LocationService
  ) {}

  async createRoute(routeDto: CreateRouteDTO): Promise<CreateRouteResponse> {
    if (!routeDto.start || !routeDto.end)
      throw new Error('Missing start or end location');
    const start = await this.locationService.findLocationByName(routeDto.start.name);
    const end = await this.locationService.findLocationByName(routeDto.end.name);
    const routeEntity = this.routeRepository.create({start: start, end: end});
    const route = await this.routeRepository.save(routeEntity);
    return {
      routeId: route.routeId,
      start: routeDto.start,
      end: routeDto.end
    }
  }

  async findAllRoutes(request: EmptyMessage): Promise<FindAllRoutesResponse> {
    const routes = await this.routeRepository.find({relations: ['start', 'end']});
    return {
      routes: routes.map(route => ({
        routeId: route.routeId,
        start: {
          name: route.start.name,
          latitude: route.start.latitude,
          longitude: route.start.longitude
        },
        end: {
          name: route.end.name,
          latitude: route.end.latitude,
          longitude: route.end.longitude
        }
      }))
    }
  }
  async updateRoute(updateRouteDto: UpdateRouteDTO): Promise<UptateRouteResponse> {
    console.log(updateRouteDto);
    const route = await this.routeRepository.findOne({where: {routeId: updateRouteDto.routeId}});
    if (!route)
      throw new Error('Route not found');
    if (updateRouteDto.start) {
      console.log("START")
      const start = await this.locationService.findLocationByName(updateRouteDto.start.name);
      route.start = start;
    }
    if (updateRouteDto.end) {
      console.log("END")
      const end = await this.locationService.findLocationByName(updateRouteDto.end.name);
      route.end = end;
    }
    await this.routeRepository.save(route);
    return {
      routeId: route.routeId,
      start: {
        name: route?.start.name,
        latitude: route?.start.latitude,
        longitude: route?.start.longitude
      },
      end: {
        name: route?.end.name,
        latitude: route?.end.latitude,
        longitude: route?.end.longitude
      }
    }
  }
  async deleteRoute(deleteRouteDto: DeleteRouteDTO): Promise<DeleteRouteResponse> {
    const route = await this.routeRepository.findOne({where: {routeId: deleteRouteDto.routeId}});
    if (!route)
      return {
        routeId: deleteRouteDto.routeId,
        deleted: false
      };
    await this.routeRepository.remove(route);
    return {
      routeId: route.routeId,
      deleted: true
    }
  }

}
