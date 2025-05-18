import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPORTS_RQM_URL } from 'src/configs/enviroment';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [REPORTS_RQM_URL],
          queue: 'report_request_queue',
        },
      },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
