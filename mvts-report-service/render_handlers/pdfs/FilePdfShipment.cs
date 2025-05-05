using mvts_report_service.dtos;
using mvts_report_service.renders.pdf;
using mvts_report_service.services.grpc;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

namespace mvts_report_service.render_handlers.pdfs
{
    internal class FilePdfShipment : IFileReport
    {
        private readonly GrpcShipment _grpcClient;
        public FilePdfShipment()
        {
            _grpcClient = new GrpcShipment();
        }

        public async Task<ReportDTO> Generate(ReportDetailsDTO detailsReport)
        {
            var shipments = await _grpcClient.GetDataAsync(detailsReport);
            QuestPDF.Settings.License = LicenseType.Community;
            var documento = new PdfShipment(shipments, (int)detailsReport.DateType);
            var file = documento.GeneratePdf();

            var report = new ReportDTO()
            {
                ContentType = "application/pdf",
                ExtFile = ".pdf",
                FileName = $"ShipmentReport_{DateTime.UtcNow.ToString("yyyyMMdd_HHmmss")}",
                File = Convert.ToBase64String(file)
            };
            Console.WriteLine($"FilePdfShipment: Pdf {report.FileName}{report.ExtFile} creado");

            return report;
        }
    }
}
