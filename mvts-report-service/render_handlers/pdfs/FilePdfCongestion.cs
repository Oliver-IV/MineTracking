using Google.Protobuf.WellKnownTypes;
using mvts_congestion_service;
using mvts_report_service.dtos;
using mvts_report_service.renders.pdf;
using mvts_report_service.services.grpc;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace mvts_report_service.render_handlers.pdfs
{
    internal class FilePdfCongestion : IFileReport
    {
        private readonly GrpcCongestion _grpcClient;
        public FilePdfCongestion()
        {
            _grpcClient = new GrpcCongestion();
        }
        public async Task<ReportDTO> Generate(ReportDetailsDTO detailsReport)
        {
            var congestions = await _grpcClient.GetDataAsync(detailsReport);
            QuestPDF.Settings.License = LicenseType.Community;
            var documento = new PdfCongestion(congestions, (int)detailsReport.DateType);
            var file = documento.GeneratePdf();

            var report = new ReportDTO()
            {
                ContentType = "application/pdf",
                ExtFile = ".pdf",
                FileName = $"CongestionReport_{Guid.NewGuid().ToString()}",
                File = Convert.ToBase64String(file)
            };
            Console.WriteLine($"FilePdfCongestion: Pdf con nombre {report.FileName}{report.ExtFile} creado");
            return report;
        }
    }
}
