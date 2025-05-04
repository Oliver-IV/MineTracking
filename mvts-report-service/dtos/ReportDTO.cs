using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace mvts_report_service.dtos
{
    internal class ReportDTO
    {
        
        public string? FileName { get; set; }
        public string ContentType { get; set; } = "application/pdf";
        public byte[]? File { get; set; }
        public string ExtFile { get; set; } = ".pdf";
    }
}
