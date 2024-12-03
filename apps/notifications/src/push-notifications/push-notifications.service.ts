import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '@app/contracts';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PushNotificationsService {
  private readonly pushWebhookUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.pushWebhookUrl = this.configService.get<string>('PUSH_WEBHOOK_URL');
  }

  async send(data: CreateNotificationDto) {
    try {
      await lastValueFrom(this.httpService.post(this.pushWebhookUrl, data));
      console.log(
        `Push notification sent with message: "${data.message}" at ${new Date().toISOString()}`,
      );
    } catch (error) {
      console.error('Error sending notification:', error.message);
      throw error;
    }
  }
}
