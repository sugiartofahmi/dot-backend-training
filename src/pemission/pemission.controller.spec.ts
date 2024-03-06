import { Test, TestingModule } from '@nestjs/testing';
import { PemissionController } from './pemission.controller';

describe('PemissionController', () => {
  let controller: PemissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemissionController],
    }).compile();

    controller = module.get<PemissionController>(PemissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
