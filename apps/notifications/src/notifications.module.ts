import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { NotificationsController } from './notifications.controller';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';

@Module({
  imports: [
    PushNotificationsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'notification.delayed',
          type: 'x-delayed-message',
          options: {
            arguments: { 'x-delayed-type': 'direct' },
          },
        },
      ],
      uri: `${process.env.RABBITMQ_URL}`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [NotificationsController],
  providers: [],
})
export class NotificationsModule {}
