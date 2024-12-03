export enum NotificationType {
  push = 'push',
  email = 'email',
  sms = 'sms',
}

export class CreateNotificationDto {
  message: string;
  type: keyof typeof NotificationType;
  delayMs: number;
}

export class NotificationDto {
  id: string;
  message: string;
  type: typeof NotificationType;
  createdAt: Date;
}
