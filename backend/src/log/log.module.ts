// backend/src/log/log.module.ts
import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';

@Module({
  providers: [LogService],
  controllers: [LogController],
})
export class LogModule {}
