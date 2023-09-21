import { Injectable } from '@nestjs/common';
import { User } from '../users/user';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      email: 'lucas@mail.com',
      nome: 'Lucas',
      senha: '$2b$10$5Yrdkp/2rwovehan4IWl9u3vJHjOxn4wswBUctMMrlJONr/m8UtDS',
      role: 1,
    },
    {
      id: 2,
      email: 'lopes@mail.com',
      nome: 'Lopes',
      senha: '$2b$10$XdHGMkdz/VXCIDVAafCHROCfleqsLnSKOL1B8q99XEqHM/PrtPb96',
      role: 2,
    },
  ];

  async getUsers() {
    return this.users;
  }

  async createUser(user: UserDto) {
    user.senha = await bcrypt.hash(user.senha, await bcrypt.genSalt());

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
