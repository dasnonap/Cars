import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MulterModule.register({
          dest: './ads/photos/'
  })],
  controllers: [UploadsController]
})
export class UploadsModule {}
