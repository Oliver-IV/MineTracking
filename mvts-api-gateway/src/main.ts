import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as https from 'https';
import { CERT_PASS } from './configs/enviroment';
import { JwtGuard } from './auth/guards/JwtGuard';
import * as cookieParser from 'cookie-parser';
import { credentials } from '@grpc/grpc-js';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync("./certs/server.key"),
    cert: fs.readFileSync("./certs/server.crt"),
    passphrase: CERT_PASS
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true, 
  //   forbidNonWhitelisted: true,
  //   transform: true, 
  // }));
  app.enableCors({
    origin: function (origin, callback) {
      // Permitir cualquier origen
      callback(null, origin);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Set-Cookie']
  });
  // app.enableCors({
  //   origin: ['http://localhost:4200', 'https://mi-dominio.com'], // Lista de orígenes permitidos
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  //   credentials: true, // Permitir cookies y encabezados de autenticación
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
