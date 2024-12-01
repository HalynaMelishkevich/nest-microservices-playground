import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('notification.send')
  send({ type }: { type: 'push' | 'email' }) {
    console.log('Received message');
    return this.notificationsService.send({ type });
  }
}
