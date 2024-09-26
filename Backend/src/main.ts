import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],  // Asegúrate de incluir `debug` si quieres más detalle
  });

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000',  // Permitir solicitudes desde el frontend en el puerto 3000
    credentials: true,  // Permitir envío de cookies si es necesario
  });

  await app.listen(4000);
  console.log(`Backend corriendo en el puerto 4000`);
}
bootstrap();