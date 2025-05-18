using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace mvts_report_service.dtos
{
    internal class ReportDTO
    {
        [JsonPropertyName("fileName")]
        public string? FileName { get; set; }
        [JsonPropertyName("contentType")]
        public string ContentType { get; set; } = "application/pdf";
        [JsonPropertyName("file")]
        public string? File { get; set; }
        [JsonPropertyName("extFile")]
        public string ExtFile { get; set; } = ".pdf";
    }
}
