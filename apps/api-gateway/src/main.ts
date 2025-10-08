import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  // console.log('API_KEY:', configService.get('API_KEY'));
  // const frontendUrl = configService.get<string>('FRONTEND_URL');
  app.enableCors({
    // origin: frontendUrl, // your frontend URL
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // credentials: true,
  });

  const globalPrefix = 'api-docs';
  app.setGlobalPrefix(globalPrefix);
  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for Products and Orders microservices')
    .setVersion('1.0')
    .addTag('products')
    .addTag('orders')
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'ApiKeyAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });

  document.paths = Object.fromEntries(
    Object.entries(document.paths).map(([path, methods]) => [
      path,
      Object.fromEntries(
        Object.entries(methods).map(([method, operation]) => [
          method,
          { ...operation, security: [{ ApiKeyAuth: [] }] },
        ]),
      ),
    ]),
  );

  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
