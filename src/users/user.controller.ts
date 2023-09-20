import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../users/user';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserUpdatePartialDto } from './dto/user.update.partial.dto';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@UseInterceptors(LogInterceptor)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() body: UserDto): Promise<User[]> {
    return this.userService.createUser(body);
  }

  @Get(':id')
  async getUser(@ParamId('id') id: number) {
    return { id };
  }

  @Patch(':id')
  async updatePartialUser(
    @Body() { nome, email, senha }: UserUpdatePartialDto,
    @ParamId('id') id: number,
  ) {
    return { id, nome, email, senha };
  }

  @Put(':id')
  async updateUser(@Body() body: UserUpdateDto, @ParamId('id') id: number) {
    return { id, body: body };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
