// backend/src/log/log.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private logs: LogService) {}

  /** POST /logs — { userId, action, payload? } (ex : video_play, chapter_seek). */
  @Post()
  record(@Body() body: { userId: string; action: string; payload?: object }) {
    return this.logs.record(body.userId, body.action, body.payload);
  }

  /** GET /logs/:userId?take=50 — historique récent. */
  @Get(':userId')
  recent(@Param('userId') userId: string, @Query('take') take?: string) {
    return this.logs.recent(userId, take ? parseInt(take, 10) : 50);
  }
}
