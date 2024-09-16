import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure le préfixe global pour toutes les routes
  app.setGlobalPrefix('api/v1');
  // Activer CORS avec des options personnalisées
  app.enableCors({
    origin: 'http://localhost:3000', // Remplacez par l'origine du front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Accept, Authorization', // En-têtes autorisés
    credentials: true, // Permettre l'envoi de cookies
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
