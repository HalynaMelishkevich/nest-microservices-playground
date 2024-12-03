import { Module } from '@nestjs/common';

import { NotificationsController } from './notifications.controller';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [PushNotificationsModule, RabbitmqModule],
  controllers: [NotificationsController],
  providers: [],
})
export class NotificationsModule {}
