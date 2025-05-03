import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet'; // ← Importação

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet()); // ← Proteção contra vulnerabilidades conhecidas
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // 🔽 Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API FitCRM')
    .setDescription('Documentação da API de autenticação com JWT e refresh token')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Acessível em /api

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);

  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📘 Swagger disponível em http://localhost:${port}/api`);
}
bootstrap();
