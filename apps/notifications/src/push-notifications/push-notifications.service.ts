import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '@app/contracts';

@Injectable()
export class PushNotificationsService {
  send(data: CreateNotificationDto) {
    console.log(
      `Push notification sent with message: ${data.message} at ${new Date().toISOString()}`,
    );
  }
}
