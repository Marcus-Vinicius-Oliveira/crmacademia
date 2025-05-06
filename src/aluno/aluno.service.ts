// aluno.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async listarTodos() {
    return this.prisma.aluno.findMany();
  }
}
