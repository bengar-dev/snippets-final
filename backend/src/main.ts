import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const config = new ConfigService();

  const app = await NestFactory.create(AppModule, {
    cors: { origin: [config.get('FRONTEND_ENDPOINT')], credentials: true },
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
