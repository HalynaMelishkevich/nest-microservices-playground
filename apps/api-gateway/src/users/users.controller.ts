import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: { username: string }) {
    return this.usersService.create(body.username);
  }
}
