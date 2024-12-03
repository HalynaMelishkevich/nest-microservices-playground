import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '@app/contracts';

@Injectable()
export class RabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(routingKey: string, data: CreateNotificationDto) {
    await this.amqpConnection.publish('amq.direct', routingKey, data);
  }
}
