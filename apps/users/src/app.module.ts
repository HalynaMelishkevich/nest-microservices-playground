import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://root:root@postgres:5432/users',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true, // TODO disable in production, can cause data loss
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}