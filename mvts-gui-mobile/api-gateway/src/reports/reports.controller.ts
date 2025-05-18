
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportDetailsDTO } from './dto/report.detailts.dto';
import { firstValueFrom } from 'rxjs';
import { ReportDTO } from './dto/report.dto';
import {Response} from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post() // Ajusta la ruta si es necesario
  async generatePDF(@Body() reportDetailsDTO: ReportDetailsDTO, @Res() response: Response) {
    try {
      const report: ReportDTO = await firstValueFrom(
        this.reportsService.generatePdf(reportDetailsDTO)
      );

      if (!report?.file) {
        return response.status(HttpStatus.NOT_FOUND).send('No se generó el archivo PDF.');
      }

      const fileBuffer = Buffer.from(report.file, 'base64');

      response.setHeader('Content-Type', report.contentType);
      response.setHeader('Content-Disposition', `inline; filename="${report.fileName}${report.extFile}"`);
      response.status(HttpStatus.OK).send(fileBuffer); // Envía el Buffer decodificado

    } catch (error) {
      console.error(`Error generating PDF: ${error.message}`, error.stack);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error generating PDF',
        error: error.message,
      });
    }
  }
}
