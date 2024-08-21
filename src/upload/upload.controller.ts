import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dtos/upload-file.dto';

@Controller('microservice')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (body.bucket === undefined || body.path === undefined) {
      throw new BadRequestException('Invalid body');
    }

    console.log(file);
    console.log(file.originalname);

    await this.uploadService.upload(body, file.originalname, file.buffer);
  }
}
