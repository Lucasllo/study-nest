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
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Roles(Role.Admin)
@UseGuards(RoleGuard)
@UseInterceptors(LogInterceptor)
@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@SkipThrottle() usado para o throttler não ser aplicado a esse endpoint
  @Public()
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  // Override default configuration for Rate limiting and duration.
  // @Throttle({ default: { limit: 3, ttl: 60000 } }) - usando para sobrepor a configuração padrao do throttler
  @Post()
  async createUser(@Body() body: UserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get(':id')
  async getUser(@ParamId('id') id: number) {
    return this.userService.getUser(id);
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
