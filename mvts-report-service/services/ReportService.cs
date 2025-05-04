
using mvts_report_service.dtos;
using mvts_report_service.render_handlers;
using mvts_report_service.render_handlers.pdfs;
using mvts_report_service.services.grpc;
using mvts_report_service.utils;

namespace mvts_report_service.services
{
    internal class ReportService : IReportService
    {

        // Hacer conversion del reporte
        // Escoger seleccion de reporte
        // Hacer la consulta del reporte
        // Crear el reporte
        // Serializar el reporte

        private IFileReport _fileReport;

        public async Task<string> GenerateReport(string message)
        {
            var dto = JsonHelper.Parse<ReportDetailsDTO>(message);
            _fileReport = SelectFileReport(dto);
            var file = await _fileReport.Generate(dto);

            var response = JsonHelper.Serialize(file);
                        
            return response;
        }

        private IFileReport SelectFileReport(ReportDetailsDTO dto)
        {
            switch (dto.ReportType)
            {
                case ReportTypeDTO.CONGESTION:
                    _fileReport = new FilePdfCongestion();
                    break;
                case ReportTypeDTO.SHIPMENT:
                    _fileReport = new FilePdfShipment();
                    break;
                default:
                    throw new Exception("Unknown report type");
            }
            return _fileReport;


        }


    }
}

