import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto, CreateUserDto, UserDto } from '@app/contracts';
import { NotificationType } from '@app/contracts/notifications/notification.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class UsersService {
  private readonly pushNotificationDelay: number;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly rabbitMq: RabbitmqService,
    private readonly configService: ConfigService,
  ) {
    this.pushNotificationDelay = this.configService.get<number>(
      'PUSH_NOTIFICATION_DELAY_MS',
    );
  }

  async create(data: CreateUserDto): Promise<string> {
    const user = this.usersRepository.create(data);
    const { id } = await this.usersRepository.save(user);
    console.log(`User created with id ${id}`);

    await this.rabbitMq.publish(
      'notifications',
      {
        type: NotificationType.push,
        message: `Notification: User created with id ${id} at ${new Date().toISOString()}`,
      } as CreateNotificationDto,
      this.pushNotificationDelay,
    );
    console.log('Notification scheduled');

    return id;
  }

  async getUserById(id: string): Promise<UserDto> {
    return this.usersRepository.findOneBy({ id });
  }
}
