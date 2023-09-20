import { Injectable } from '@nestjs/common';
import { User } from '../users/user';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getUsers() {
    return this.users;
  }

  async createUser(user) {
    // this.users.push(user);
    return this.users;
  }
}
