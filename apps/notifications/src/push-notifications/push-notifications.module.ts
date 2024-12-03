import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PushNotificationsService } from './push-notifications.service';

@Module({
  imports: [HttpModule],
  providers: [PushNotificationsService],
  exports: [PushNotificationsService],
})
export class PushNotificationsModule {}
