import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS – allow all origins so the CRM and user-app work
  // whether served locally (live-server, npx serve) or on any host.
  // In production, replace the wildcard with your actual domain.
  app.enableCors({
    origin: true,           // reflect the request origin (permits any origin)
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Esticure backend running on port ${port}`);
}

bootstrap();
