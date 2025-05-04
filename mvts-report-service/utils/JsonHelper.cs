using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace mvts_report_service.utils
{
    internal static class JsonHelper
    {
        public  static T? Parse<T>(string json)
        {
            return  JsonSerializer.Deserialize<T>(json);
        }
        public static string Serialize<T>(T obj)
        {
            return JsonSerializer.Serialize(obj);
        }
    }
}
