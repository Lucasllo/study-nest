import { Injectable } from '@nestjs/common';
import { User } from '../users/user';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      email: 'lucas@mail.com',
      nome: 'Lucas',
      senha: '123456',
      role: 1,
    },
    {
      id: 2,
      email: 'lopes@mail.com',
      nome: 'Lopes',
      senha: '654321',
      role: 2,
    },
  ];

  async getUsers() {
    return this.users;
  }

  async createUser(user: UserDto) {
    const newUser: User = {
      email: user.email,
      id: this.users.length + 1,
      nome: user.nome,
      senha: user.senha,
      role: user.role,
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUser(id: number) {
    return this.users.filter((u) => u.id == id);
  }
}
