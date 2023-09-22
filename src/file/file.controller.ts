import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @Post('photo')
  async photo(@UploadedFile() file: Express.Multer.File) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      'photos.jpeg',
    );
    try {
      await this.fileService.photo(file, path);
    } catch (error) {
      throw new BadRequestException('Erro com envio.');
    }
    return { sucess: true };
  }
}
