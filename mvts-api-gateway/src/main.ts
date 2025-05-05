import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true, 
  //   forbidNonWhitelisted: true,
  //   transform: true, 
  // }));
  app.enableCors();
  // app.enableCors({
  //   origin: ['http://localhost:4200', 'https://mi-dominio.com'], // Lista de orígenes permitidos
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  //   credentials: true, // Permitir cookies y encabezados de autenticación
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
