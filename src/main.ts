import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar validaciones globales 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,                // elimina campos que no estén en el DTO
    forbidNonWhitelisted: true,     // lanza error si envían campos extra
    transform: true,                // convierte tipos automáticamente
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Equipment API')
    .setDescription('API para gestionar equipos de la empresa')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Documentación Swagger: http://localhost:3000/api/docs');
}

bootstrap();
