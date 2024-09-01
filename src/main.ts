import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Configurer CORS avec des options
  // app.enableCors({
  //   origin: 'http://example.com', // Remplacez par l'origine autorisée
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // Permettre l'envoi de cookies avec les requêtes cross-origin
  // });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
