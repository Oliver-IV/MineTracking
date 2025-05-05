
using System.Text.Json.Serialization;

namespace mvts_report_service.dtos
{
    internal class ReportDetailsDTO
    {
        [JsonPropertyName("reportType")]
        public ReportTypeDTO ReportType { get; set; }

        [JsonPropertyName("dateType")]
        public DateType DateType { get; set; }

        public override string ToString()
        {
            return $"Type={ReportType.ToString()}, Date={DateType.ToString()}";
        }
    }
}
