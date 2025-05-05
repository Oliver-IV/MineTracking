using mvts_shipment_service;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace mvts_report_service.renders.pdf
{
    internal class PdfShipment : IDocument
    {
        private readonly DateTime _dateRequest;
        private readonly IEnumerable<ShipmentDTO> _shipments;
        private string _titulo = "Encargos";

        public PdfShipment(IEnumerable<ShipmentDTO> congestions, int date)
        {
            _shipments = congestions;
            _dateRequest = DateTime.Now;
            LoadTitle(date);
        }

        private void LoadTitle(int date)
        {
            switch (date)
            {
                case 1:
                    _titulo += $" del día de hoy";
                    break;
                case 2:
                    _titulo = $" desde hace 7 días";
                    break;
                case 3:
                    _titulo = $" de las ultimas 4 semanas";
                    break;
                default:
                    _titulo = $" por fecha";
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
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Estado").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Material").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Cantidad").Style(TextStyle.Default.Bold().Color(Colors.Black));
                                header.Cell().Background(Colors.Grey.Lighten2).Padding(5).Text("Fecha de Entrega").Style(TextStyle.Default.Bold().Color(Colors.Black));
                            });

                            // Filas de datos (sin color de fondo por ahora)
                            foreach (var congestion in _shipments)
                            {
                                table.Cell().Padding(5).Text(congestion.Id.ToString());
                                table.Cell().Padding(5).Text(congestion.State.ToString());
                                table.Cell().Padding(5).Text(congestion.Material.ToString());
                                table.Cell().Padding(5).Text(congestion.Quantity.ToString());
                                table.Cell().Padding(5).Text(congestion.DateDelivered);
                            }
                        });
                });
        }
    }
}
