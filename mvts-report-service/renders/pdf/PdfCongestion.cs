using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using mvts_congestion_service;

namespace mvts_report_service.renders.pdf
{
    internal class PdfCongestion : IDocument
    {
        private readonly DateTime _dateRequest;
        private readonly IEnumerable<CongestionDTO> _congestions;
        private string? _titulo;

        public PdfCongestion(IEnumerable<CongestionDTO> congestions, int date)
        {
            _congestions = congestions;
            _dateRequest = DateTime.Now;
            LoadTitle(date);
        }

        private void LoadTitle(int date)
        {
            switch (date)
            {
                case 1:
                    _titulo = "Congestiones del día de hoy";
                    break;
                case 2:
                    _titulo = "Congestiones desde hace 7 días";
                    break;
                case 3:
                    _titulo = "Congestiones de las ultimas 4 semanas";
                    break;
                default:
                    _titulo = "Congestiones por fecha";
                    break;
            }
        }

        public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

        public void Compose(IDocumentContainer container)
        {
            container
                .Page(page =>
                {
                    page.Margin(20);

                    page.Header()
                        .Row(row =>
                        {
                            row.RelativeItem()
                                .Text(_titulo)
                                .Style(TextStyle.Default.Size(20).Bold().Color(Colors.Blue.Medium)); // Título en azul
                            row.RelativeItem()
                                .AlignRight()
                                .Text($"Fecha de Solicitud: {_dateRequest:dd/MM/yyyy HH:mm}")
                                .Style(TextStyle.Default.Italic()); // Fecha en gris oscuro
                        });

                    page.MarginVertical(20);

                    page.Content()
                        .Table(table =>
                        {
                            // Definir las columnas
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            // Encabezados de la tabla con fondo de color
                            table.Header(header =>
                            {
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Id").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Nombre").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Latitud").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Longitud").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Fecha de Creación").Style(TextStyle.Default.Bold().Color(Colors.Black));
                            });

                            // Filas de datos (sin color de fondo por ahora)
                            foreach (var congestion in _congestions)
                            {
                                table.Cell().Padding(5).Text(congestion.Id.ToString());
                                table.Cell().Padding(5).Text(congestion.Name);
                                table.Cell().Padding(5).Text(congestion.Lat.ToString("N2"));
                                table.Cell().Padding(5).Text(congestion.Lng.ToString("N2"));
                                table.Cell().Padding(5).Text(congestion.CreatedAt);
                            }
                        });
                });
        }
    }
}
