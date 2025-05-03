import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors(); // ou app.use(cors()) – equivalente
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);

  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
}
bootstrap();
