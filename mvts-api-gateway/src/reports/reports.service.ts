import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReportDetailsDTO } from './dto/report.detailts.dto';
import { ReportDTO } from './dto/report.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(@Inject('REPORT_SERVICE') private readonly rabbitClient: ClientProxy) {}

   generatePdf(reportDetails: ReportDetailsDTO) : Observable<ReportDTO>{
    return this.rabbitClient.send<ReportDTO,ReportDetailsDTO>('create-pdf',reportDetails);
  }
}
