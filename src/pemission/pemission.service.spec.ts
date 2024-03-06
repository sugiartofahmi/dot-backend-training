import { Test, TestingModule } from '@nestjs/testing';
import { PemissionService } from './pemission.service';

describe('PemissionService', () => {
  let service: PemissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemissionService],
    }).compile();

    service = module.get<PemissionService>(PemissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
