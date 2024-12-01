export class CreateUserDto {
  username: string;
}

export class UserDto {
  id: string;
  username: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}