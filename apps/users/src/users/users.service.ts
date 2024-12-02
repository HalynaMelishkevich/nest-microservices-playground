import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  NotificationsPatterns,
  CreateNotificationDto, UserDto,
} from '@app/contracts';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject('NOTIFICATIONS_CLIENT') private notificationsClient: ClientProxy,
  ) {}

  async create(data: CreateUserDto): Promise<string> {
    const user = this.usersRepository.create(data);
    const { id } = await this.usersRepository.save(user);

    this.notificationsClient
      .send(NotificationsPatterns.sendNotification, {
        type: 'push',
        message: `Notification: User created with id ${id}`,
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

  async getUserById(id: string): Promise<UserDto> {
    return this.usersRepository.findOneBy({ id });
  }
}
