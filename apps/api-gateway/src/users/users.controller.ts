import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '@app/contracts';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}
