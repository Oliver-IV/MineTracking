using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mvts_report_service.services
{
    internal interface IReportService
    {
        Task<string> GenerateReport(string message);
    }
}
