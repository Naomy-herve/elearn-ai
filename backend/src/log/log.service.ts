// backend/src/log/log.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class LogService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /** Écriture durable dans PostgreSQL + compteur chaud dans Redis. */
  async record(userId: string, action: string, payload?: object) {
    await this.prisma.activityLog.create({ data: { userId, action, payload: (payload as any) ?? undefined } });
    await this.redis.incrLog(action);
    return { ok: true };
  }

  /** Lecture : logs récents d'un utilisateur. */
  async recent(userId: string, take = 50) {
    return this.prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }
}
