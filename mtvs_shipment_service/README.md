# Pasos para la configuracion del back
 1. Posicionarse en la raiz de la carpeta.
 2. Tener todas las dependencias para poder ejecutar programas en C#.
 3. Configurar correctamente el appsettings.Development.json
 4. Crear la base de datos con el nombre que deseen.
 5. 'dotnet ef migrations add First' para crear la migración de la base de datos.
 6. 'dotnet ef database update' para mapear la base de datos.
 7. "npm run mapeo": para mapear la base de datos.
 8. "dotnet run": Para ejecutar el servidor.
 9. Disfrutar y ser feliz.

## Configuración del documento appsettings.Development.json
```
{
  "ConnectionStrings": {
    "PostgreSQLConnection": Host=HOST_NAME;Username=USERNAME;Password=PASSWORD;Database=DB_NAME
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