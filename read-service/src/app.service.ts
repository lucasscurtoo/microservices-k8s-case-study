import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { DB, type Database } from './db/db.provider';
import { urls } from '@url-shortener/db-schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS') private redisClient: Redis,
    @Inject(DB) private database: Database,
  ) {}
  async getUrl(shortCode: string): Promise<{ url: string }> {
    const cachedUrl = await this.redisClient.get(`url:${shortCode}`);

    if (!cachedUrl) {
      const url = await this.database.query.urls.findFirst({
        columns: { longUrl: true, shortCode: true },
        where: eq(urls.shortCode, shortCode),
      });

      if (!url) {
        throw new NotFoundException('URL not found');
      }

      await this.redisClient.set(`url:${shortCode}`, url.longUrl, 'EX', 3600);
      return { url: url.longUrl };
    }

    return { url: cachedUrl };
  }
}
