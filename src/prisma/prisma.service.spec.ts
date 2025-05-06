import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('should be instantiated', () => {
    const service = new PrismaService();
    expect(service).toBeDefined();
  });
});
