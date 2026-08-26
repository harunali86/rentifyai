import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 0. Global Resilience & Performance Tracking
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 1. Security Headers (Industry Standard)
  app.use(helmet());

  // 2. Global CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // 3. API Versioning (The "Mobile-Ready" Rule)
  app.setGlobalPrefix('api/v1');

  // 4. Global Validation Pipe (The "Hardened Input" Rule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 5. Swagger Config (Auto-Documentation)
  const config = new DocumentBuilder()
    .setTitle('RentifyAI API (v1)')
    .setDescription('RentifyAI Production-Grade Real Estate API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Properties')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Server hardened and running on: http://localhost:${port}/api/v1`);
}
bootstrap();
