// backend/src/redis/redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client = new Redis(process.env.REDIS_URL ?? 'redis://redis:6379');

  /** Cache lecture rapide : progression utilisateur (TTL 24h). */
  async getProgress(userId: string) {
    const raw = await this.client.get(`progress:${userId}`);
    return raw ? JSON.parse(raw) : null;
  }

  async setProgress(userId: string, data: unknown) {
    await this.client.set(`progress:${userId}`, JSON.stringify(data), 'EX', 86400);
  }

  /** Incrément atomique : compteurs de lecture vidéo (logs chauds). */
  async incrLog(action: string) {
    return this.client.incr(`logs:${action}:${new Date().toISOString().slice(0, 10)}`);
  }
}
