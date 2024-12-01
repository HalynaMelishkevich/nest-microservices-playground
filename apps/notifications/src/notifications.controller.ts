import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateNotificationDto, NotificationsPatterns } from '@app/contracts';

import { PushNotificationsService } from './push-notifications/push-notifications.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @MessagePattern(NotificationsPatterns.sendNotification)
  send(data: CreateNotificationDto) {
    console.log(`Received ${data.type} message`);

    switch (data.type) {
      case 'push': {
        return this.pushNotificationsService.send(data);
      }
    }
  }
}
