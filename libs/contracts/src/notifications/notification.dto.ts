export class CreateNotificationDto {
  message: string;
  type: 'push' | 'email' | 'sms';
}

export class NotificationDto {
  id: string;
  message: string;
  type: 'push' | 'email' | 'sms';
  createdAt: Date;
}
