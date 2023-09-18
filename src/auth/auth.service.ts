import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken() {}

  async checkToken(token: string) {}

  async login(email: string, senha: string) {
    return email;
  }

  async register() {}

  async forget(email: string) {}

  async reset(senha: string, token: string) {}
}
