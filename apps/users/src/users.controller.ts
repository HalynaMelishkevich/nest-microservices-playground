import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, UsersPatterns } from '@app/contracts';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersPatterns.createUser)
  create(data: CreateUserDto): string {
    return this.usersService.create(data);
  }
}
