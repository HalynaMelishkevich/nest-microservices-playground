import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  // TODO replace with DB data
  private users: UserDto[] = [
    {
      id: '80f00914-6285-43e7-b33f-8d509ed5f475',
      username: 'test_user_1',
    },
  ];

  create(username: string): string | number {
    const isDuplicate = this.users.some(user => user.username === username);
    if (isDuplicate) return -1; // TODO replace with custom exception

    const id = randomUUID();
    this.users.push({
      id,
      username,
    });

    return id;
  }
}
