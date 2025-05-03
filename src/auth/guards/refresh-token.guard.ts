import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt') {
  // Futuramente, você pode customizar aqui se quiser validar um schema de token diferente
}
