import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  private users: User[] = [
    {
      id: 1,
      email: 'lucas@mail.com',
      nome: 'Lucas',
      senha: '123456',
    },
    {
      id: 2,
      email: 'lopes@mail.com',
      nome: 'Lopes',
      senha: '654321',
    },
  ];

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      token: this.jwtService.sign(
        {
          nome: user.nome,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
          // notBefore: -> só fica valido apos essa data;
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, senha: string) {
    const user: User[] = this.users.filter(
      (u) => u.email == email && u.senha == senha,
    );
    return user.length > 0
      ? user[0]
      : new UnauthorizedException('Email e/ou senha incorretos.');
  }

  async create(body: AuthRegisterDTO) {}

  async forget(email: string) {}

  async reset(senha: string, token: string) {
    //validar token

    const id: number = 1;

    this.users.forEach((u) => (u.id == id ? (u.senha = senha) : ''));

    const user: User[] = this.users.filter(
      (u) => u.id == id && u.senha == senha,
    );

    return user.length > 0
      ? this.createToken(user[0])
      : new UnauthorizedException('Email e/ou senha incorretos.');
  }

  async register(data: AuthRegisterDTO) {
    const user: User[] = await this.userService.createUser(data);

    return user.length > 0
      ? this.createToken(user[0])
      : new UnauthorizedException('Email e/ou senha incorretos.');
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
