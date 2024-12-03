import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(routingKey: string, data: any) {
    return this.amqpConnection.publish('notifications', routingKey, data);
  }
}
