import { Module } from '@nestjs/common';
import { TrafficLightsModule } from './traffic-lights/traffic-lights.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from 'configs/database.config';
import { LocationEntity, TrafficLightEntity } from '@app/common';

@Module({
  imports: [
    TrafficLightsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [TrafficLightEntity, LocationEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
