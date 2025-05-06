import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

describe('AlunoController', () => {
  let controller: AlunoController;

  const mockAlunoService = {
    listarTodos: jest.fn().mockReturnValue([]), // Simulação de método real
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useValue: mockAlunoService,
        },
      ],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar lista de alunos', () => {
    const resultado = controller.listar();
    expect(resultado).toEqual([]);
    expect(mockAlunoService.listarTodos).toHaveBeenCalled();
  });
});
