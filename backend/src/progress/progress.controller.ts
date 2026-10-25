// backend/src/progress/progress.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private progress: ProgressService) {}

  /** GET /progress/:userId — progressions de l'utilisateur (Redis -> PostgreSQL). */
  @Get(':userId')
  list(@Param('userId') userId: string) {
    return this.progress.list(userId);
  }

  /** POST /progress — { userId, courseId, percent } */
  @Post()
  upsert(@Body() body: { userId: string; courseId: string; percent: number }) {
    return this.progress.upsert(body.userId, body.courseId, body.percent);
  }
}
