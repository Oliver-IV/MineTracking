using mvts_report_service.dtos;
using mvts_report_service.render_handlers.pdfs;
using mvts_report_service.utils;
using mvts_report_service.render_handlers;

namespace mvts_report_service.services
{
    internal class ReportService : IReportService
    {
        private IFileReport _fileReport;

        public async Task<string> GenerateReport(string message)
        {
            var dto = JsonHelper.Parse<MessageDTO>(message);
            _fileReport = SelectFileReport(dto.Data);
            var file = await _fileReport.Generate(dto.Data);

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

