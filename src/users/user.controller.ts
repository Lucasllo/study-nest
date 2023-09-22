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
  UploadedFile,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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
  @ApiBearerAuth('access-token')
  @Post()
  async createUser(@Body() body: UserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(Number(id));
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  async updatePartialUser(
    @Body() { nome, email, senha }: UserUpdatePartialDto,
    @ParamId('id') id: number,
  ) {
    return { id, nome, email, senha };
  }

  @ApiBearerAuth('access-token')
  @Put(':id')
  async updateUser(@Body() body: UserUpdateDto, @ParamId('id') id: number) {
    return { id, body: body };
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @Post('photo')
  async photo(@UploadedFile() file: Express.Multer.File) {
    const result = await writeFile(
      join(__dirname, '..', '..', 'storage', 'photos', 'photos.jpeg'),
      file.buffer,
    );
    return { result };
  }
}
