import { Module } from '@nestjs/common';

import { NotificationsController } from './notifications.controller';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';

@Module({
  imports: [PushNotificationsModule],
  controllers: [NotificationsController],
  providers: [],
})
export class NotificationsModule {}
