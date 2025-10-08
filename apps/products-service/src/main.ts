import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('DB_USER from .env:', process.env.DB_USER);
  console.log('DB_PASS from .env:', process.env.DB_PASS);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
