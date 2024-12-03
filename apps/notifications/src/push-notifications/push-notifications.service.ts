import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '@app/contracts';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PushNotificationsService {
  constructor(private readonly httpService: HttpService) {}

  async send(data: CreateNotificationDto) {
    try {
      await lastValueFrom(
        this.httpService.post(
          'https://webhook.site/5d9f6579-4f16-4e3d-b345-a5461b31bb07', // TODO move to configs
          data,
        ),
      );
      console.log(
        `Push notification sent with message: "${data.message}" at ${new Date().toISOString()}`,
      );
    } catch (error) {
      console.error('Error sending notification:', error.message);
      throw error;
    }
  }
}
