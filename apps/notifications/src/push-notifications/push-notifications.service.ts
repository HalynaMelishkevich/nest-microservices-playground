import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '@app/contracts';

@Injectable()
export class PushNotificationsService {
  send(data: CreateNotificationDto) {
    console.log(data.message);
  }
}
