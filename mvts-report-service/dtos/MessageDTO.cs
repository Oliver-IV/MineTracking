using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace mvts_report_service.dtos
{
    internal class MessageDTO
    {
        [JsonPropertyName("pattern")]
        public string Pattern { get; set; }
        [JsonPropertyName("data")]
        public ReportDetailsDTO Data { get; set; }
    }
}
