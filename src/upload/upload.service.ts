import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadFileDto } from './dtos/upload-file.dto';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  async test() {
    console.log('test: ', this.configService.get('AWS_REGION'));
  }

  async upload(body: UploadFileDto, fileName: string, file: Buffer) {
    const { bucket, path } = body;

    const result = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: path + fileName,
        Body: file,
      }),
    );

    return result;
  }
}
