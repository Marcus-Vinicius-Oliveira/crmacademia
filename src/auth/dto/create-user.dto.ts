import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Marcus Vinícius', description: 'Nome completo do usuário' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'marcus@email.com', description: 'E-mail válido do usuário' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'senha123', minLength: 6, description: 'Senha com no mínimo 6 caracteres' })
  @MinLength(6)
  password!: string;
}
