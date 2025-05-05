using mvts_report_service.dtos;

namespace mvts_report_service.render_handlers
{
    internal interface IFileReport
    {
        public Task<ReportDTO> Generate(ReportDetailsDTO detailsReport);
    }
}
