import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'users',
        port: 3001,
      },
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    },
  );

  await app.listen();
}

bootstrap();
