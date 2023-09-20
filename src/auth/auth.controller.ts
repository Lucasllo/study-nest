import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { ok } from 'assert';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { login, senha }: AuthLoginDTO) {
    return this.authService.login(login, senha);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { login }: AuthForgetDTO) {
    this.authService.forget(login);
  }

  @Post('reset')
  async reset(@Body() { senha, token }: AuthResetDTO) {
    return this.authService.reset(senha, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() body) {
    return { me: ok, data: body.token };
  }
}
