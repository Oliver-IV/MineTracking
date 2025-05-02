# Pasos para la configuracion del back
 1. Posicionarse en la raiz de la carpeta.
 2. Tener todas las dependencias para poder ejecutar programas en C#.
 3. Configurar correctamente el appsettings.Development.json
 4. 'dotnet ef migrations add First' para crear la migración de la base de datos.
 5. 'dotnet ef database update' para mapear la base de datos.
 6. "npm run mapeo": para mapear la base de datos.
 7. "dotnet run": Para ejecutar el servidor.
 8. Disfrutar y ser feliz.

## Configuración del documento appsettings.Development.json
```
{
  "ConnectionStrings": {
    "PostgreSQLConnection": La conexión de la respectiva base de datos
  },
  "RabbitSettings": {
    "Host": El host donde se ejecuta RabbitMQ,
    "Port": El puerto que escuchara RabbitMQ,
    "CongestionExchangeName": Nombre del intercambio de mensajes para avisar cuando se crea una congestion
  }
}
```

### Estructura del servicio GRPC
```

```