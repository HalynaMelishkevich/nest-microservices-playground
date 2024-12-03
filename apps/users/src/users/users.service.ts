import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateNotificationDto,
  CreateUserDto,
  RabbitmqRoutingKeys,
  UserDto,
} from '@app/contracts';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { NotificationType } from '@app/contracts/notifications/notification.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    // private readonly rabbitMq: RabbitmqService,
  ) {}

  async create(data: CreateUserDto): Promise<string> {
    const user = this.usersRepository.create(data);
    const { id } = await this.usersRepository.save(user);

    // await this.rabbitMq.publish(RabbitmqRoutingKeys.notifications, {
    //   type: NotificationType.push,
    //   message: `Notification: User created with id ${id} at ${new Date().toISOString()}`,
    //   delayMs: 1000, // TODO 24 * 60 * 60 * 1000, move to configs
    // } as CreateNotificationDto);

    return id;
  }

  async getUserById(id: string): Promise<UserDto> {
    return this.usersRepository.findOneBy({ id });
  }
}
