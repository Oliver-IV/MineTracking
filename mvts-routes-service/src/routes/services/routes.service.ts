import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../entities/route.entity';
import { Repository } from 'typeorm';
import { CreateRouteDTO, CreateRouteResponse, DeleteRouteDTO, DeleteRouteResponse, EmptyMessage, FindAllLocationsResponse, FindAllRoutesResponse, UpdateRouteDTO, UptateRouteResponse } from '../protos/routes';
import { LocationService } from './location.service';

@Injectable()
export class RoutesService {

  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
    private readonly locationService: LocationService
  ) {}

  async createRoute(routeDto: CreateRouteDTO): Promise<CreateRouteResponse> {
    if (!routeDto.startId || !routeDto.endId)
      throw new Error('Missing start or end location');
    const start = await this.locationService.findLocationById(routeDto.startId);
    const end = await this.locationService.findLocationById(routeDto.endId);
    const routeEntity = this.routeRepository.create({start: start, end: end});
    const route = await this.routeRepository.save(routeEntity);
    return {
      routeId: route.routeId,
      start: {
        id: route?.start.locationId,
        name: route?.start.name,
        latitude: route?.start.latitude,
        longitude: route?.start.longitude
      },
      end: {
        id: route?.end.locationId,
        name: route?.end.name,
        latitude: route?.end.latitude,
        longitude: route?.end.longitude
      }
    }
  }

  async findAllRoutes(request: EmptyMessage): Promise<FindAllRoutesResponse> {
    const routes = await this.routeRepository.find({relations: ['start', 'end']});
    return {
      routes: routes.map(route => ({
        routeId: route.routeId,
        start: {
          id: route.start.locationId,
          name: route.start.name,
          latitude: route.start.latitude,
          longitude: route.start.longitude
        },
        end: {
          id: route.end.locationId,
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
    if (updateRouteDto.startId) {
      console.log("START")
      const start = await this.locationService.findLocationById(updateRouteDto.startId);
      route.start = start;
    }
    if (updateRouteDto.endId) {
      console.log("END")
      const end = await this.locationService.findLocationById(updateRouteDto.endId);
      route.end = end;
    }
    await this.routeRepository.save(route);
    const updatedRoute = await this.routeRepository.findOne({where: {routeId: updateRouteDto.routeId}, relations: ['start', 'end']});
    return {
      routeId: route.routeId,
      start: {
        id: updatedRoute?.start.locationId || '',
        name: updatedRoute?.start.name || '',
        latitude: updatedRoute?.start.latitude || 0,
        longitude: updatedRoute?.start.longitude || 0
      },
      end: {
        id: updatedRoute?.end.locationId || '',
        name: updatedRoute?.end.name || '',
        latitude: updatedRoute?.end.latitude || 0,
        longitude: updatedRoute?.end.longitude || 0
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

  async findAllLocations(): Promise<FindAllLocationsResponse> {
    const locations = await this.locationService.findAllLocations();
    return {
      locations: locations.map(location => ({
        id: location.locationId,
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude
      }))
    } ;
  }

}
