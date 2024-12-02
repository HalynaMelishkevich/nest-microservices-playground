import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, UsersPatterns, UserDto } from '@app/contracts';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersPatterns.createUser)
  async create(data: CreateUserDto): Promise<string> {
    return this.usersService.create(data);
  }

  @MessagePattern(UsersPatterns.getUserById)
  async getUserById(id: string): Promise<UserDto> {
    return this.usersService.getUserById(id);
  }
}
