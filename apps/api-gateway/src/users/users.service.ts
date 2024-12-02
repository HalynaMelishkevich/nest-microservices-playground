import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UsersPatterns } from '@app/contracts';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  async create(data: CreateUserDto) {
    return this.usersClient.send(UsersPatterns.createUser, data);
  }

  async getUserById(id: string) {
    return this.usersClient.send(UsersPatterns.getUserById, id);
  }
}
