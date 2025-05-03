// aluno.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Alunos')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  listar() {
    return this.alunoService.listarTodos();
  }
}
