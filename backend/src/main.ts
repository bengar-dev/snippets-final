import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const config = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    cors: { origin: [config.get('FRONTEND_ENDPOINT')] },
  });
  await app.listen(3001);
}
bootstrap();
