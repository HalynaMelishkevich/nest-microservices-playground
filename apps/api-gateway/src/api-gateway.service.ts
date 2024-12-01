import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  status(): string {
    return 'Alive!';
  }
}
