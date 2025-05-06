import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { PrismaService } from '../prisma/prisma.service';


describe('AlunoService', () => {
  let service: AlunoService;

  const mockPrismaService = {
    aluno: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunoService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar alunos', async () => {
    await expect(service.listarTodos()).resolves.toEqual([]);
    expect(mockPrismaService.aluno.findMany).toHaveBeenCalled();
  });
});
