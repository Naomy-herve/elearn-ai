// backend/src/progress/progress.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ProgressService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /** Lecture : Redis d'abord (cache), PostgreSQL en repli. */
  async list(userId: string) {
    const cached = await this.redis.getProgress(userId);
    if (cached) return cached;
    const rows = await this.prisma.progression.findMany({ where: { userId } });
    const data = rows.map(r => ({ courseId: r.courseId, percent: r.percent }));
    await this.redis.setProgress(userId, data);
    return data;
  }

  /** Écriture : upsert PostgreSQL puis invalidation du cache Redis. */
  async upsert(userId: string, courseId: string, percent: number) {
    const row = await this.prisma.progression.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: { userId, courseId, percent },
      update: { percent },
    });
    await this.redis.setProgress(userId, [{ courseId, percent }]);
    return row;
  }
}
