import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth') // Categoria no Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    schema: {
      example: {
        email: 'usuario@email.com',
        password: 'senha123',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @ApiBearerAuth()
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Novo token gerado com sucesso' })
  async refresh(@Req() req: Request, @Body() { refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token ausente.');
    }

    const user = req.user as any;
    return this.authService.refreshTokens(user.userId, refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Retorna dados do usuário autenticado' })
  getProfile(@Req() req: Request) {
    return {
      message: 'Usuário autenticado',
      user: req.user,
    };
  }
}
