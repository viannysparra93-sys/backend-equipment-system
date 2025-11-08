
// Configuración inicial (Bootstrap) de la aplicación NestJS
// Aquí se definen ajustes globales antes de iniciar el servidor.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Crear la aplicación
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (permite conectar el frontend con el backend)
  app.enableCors();

  // Definir puerto (por ahora fijo, luego lo leeremos desde .env)
  const PORT = 3000;

  // Iniciar servidor
  await app.listen(PORT);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
}
bootstrap();
