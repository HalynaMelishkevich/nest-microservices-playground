import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'notifications',
        port: 3002,
      },
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    },
  );

  await app.listen();
}

bootstrap();
