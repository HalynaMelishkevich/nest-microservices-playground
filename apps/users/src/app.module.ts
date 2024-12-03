import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

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
    RabbitmqModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'notification.delayed',
          type: 'x-delayed-message',
          options: {
            arguments: { 'x-delayed-type': 'direct' },
          },
        },
      ],
      uri: `${process.env.RABBITMQ_URL}`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
