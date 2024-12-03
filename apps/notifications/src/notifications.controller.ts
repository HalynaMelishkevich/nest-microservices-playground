import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { PushNotificationsService } from './push-notifications/push-notifications.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @RabbitSubscribe({
    exchange: 'notification.delayed',
    routingKey: 'notifications',
  })
  public async pubSubHandler(data: any) {
    console.log(`Received ${data.type} message`);

    switch (data.type) {
      case 'push': {
        return this.pushNotificationsService.send(data);
      }
    }
  }
}
