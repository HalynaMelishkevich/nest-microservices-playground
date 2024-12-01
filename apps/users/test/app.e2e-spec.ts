import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { UsersModule } from '../src/users.module';
import {
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';

describe('Users Microservice (e2e)', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { port: 3001 },
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { port: 3001 },
    });

    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    await client.close();
  });

  it('should handle "user.create" message pattern', (done) => {
    client.send('user.create', 'test_user').subscribe({
      next: (response) => {
        expect(typeof response).toBe('string');
      },
      error: (err) => {
        done.fail(err);
      },
    });

    client.send('user.create', 'test_user').subscribe({
      next: (response) => {
        expect(response).toBe(-1);
        done();
      },
      error: (err) => {
        done.fail(err);
      },
    });
  });
});
