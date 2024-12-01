import { Test, TestingModule } from '@nestjs/testing';

import { NotificationsController } from './notifications.controller';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [],
    }).compile();

    notificationsController = app.get<NotificationsController>(
      NotificationsController,
    );
  });

  it('should be defined', () => {
    expect(notificationsController).toBeDefined();
  });
});
