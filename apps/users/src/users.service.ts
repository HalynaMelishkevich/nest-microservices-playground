import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  UserDto,
  NotificationsPatterns,
  CreateNotificationDto,
} from '@app/contracts';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('NOTIFICATIONS_CLIENT') private notificationsClient: ClientProxy,
  ) {}

  // TODO replace with DB data
  private users: UserDto[] = [
    {
      id: '80f00914-6285-43e7-b33f-8d509ed5f475',
      username: 'test_user_1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(data: CreateUserDto): string {
    const id = randomUUID();
    this.users.push({
      id,
      username: data.username,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.notificationsClient
      .send(NotificationsPatterns.sendNotification, {
        type: 'push',
        message: 'Notification: User created',
      } as CreateNotificationDto)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });

    return id;
  }
}
