/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '../users/user';


@Injectable()
export class UserService {

  private users:User[] = [];

  getUsers() {
    return this.users;
  }

  createUser(user: User){
    this.users.push(user);
    return user;
  }
}