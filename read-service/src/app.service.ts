import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { DB, type Database } from './db/db.provider';
import { urls } from '@url-shortener/db-schemas';
import { eq } from 'drizzle-orm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS') private redisClient: Redis,
    @Inject(DB) private database: Database,
    @Inject('NATS_SERVER') private natsServer: ClientProxy,
  ) {}
  async getUrl(shortCode: string): Promise<{ url: string }> {
    let visitedUrl: string;
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
      visitedUrl = url.longUrl;
    } else {
      visitedUrl = cachedUrl;
    }
    this.natsServer.emit('url.visited', shortCode).subscribe();
    return { url: visitedUrl };
  }
}
