import { AuthGuard } from './../guard/auth.guard';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../users/user';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserUpdatePartialDto } from './dto/user.update.partial.dto';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from '../guard/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Roles(Role.Admin)
  @Post()
  async createUser(@Body() body: UserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getUser(@ParamId('id') id: number) {
    return this.userService.getUser(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartialUser(
    @Body() { nome, email, senha }: UserUpdatePartialDto,
    @ParamId('id') id: number,
  ) {
    return { id, nome, email, senha };
  }

  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(@Body() body: UserUpdateDto, @ParamId('id') id: number) {
    return { id, body: body };
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
