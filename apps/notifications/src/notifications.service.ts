import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  send({ type }: { type: 'push' | 'email' }) {
    switch (type) {
      case 'push': {
        console.log('Push sent!');
        break;
      }
      default: {
        console.log('Doing nothing');
      }
    }
  }
}
