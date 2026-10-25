// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProgressModule } from './progress/progress.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [PrismaModule, ProgressModule, LogModule],
})
export class AppModule {}
