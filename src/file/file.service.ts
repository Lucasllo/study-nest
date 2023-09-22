import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async photo(file: Express.Multer.File, path: string) {
    const result = await writeFile(path, file.buffer);
    return { result };
  }
}
