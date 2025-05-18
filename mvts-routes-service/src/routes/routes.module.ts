import { Module } from '@nestjs/common';
import { RoutesService } from './services/routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Location } from './entities/location.entity';
import { LocationService } from './services/location.service';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, LocationService],
  imports: [TypeOrmModule.forFeature([Route, Location])],
})
export class RoutesModule {}
