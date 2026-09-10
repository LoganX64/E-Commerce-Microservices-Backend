import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'order',
        protoPath: join(__dirname, 'proto/order.proto'),
        url: `0.0.0.0:${process.env.GRPC_PORT || 50052}`,
      },
    },
  );
  await app.listen();
}
void bootstrap();
