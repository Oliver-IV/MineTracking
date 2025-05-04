
namespace mvts_report_service.dtos
{
    internal class ReportDetailsDTO
    {
        public ReportTypeDTO ReportType { get; set; }
        public DateType DateType { get; set; }

        public override string ToString()
        {
            return $"Type={ReportType.ToString()}, Date={DateType.ToString()}";
        }
    }
}
