import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { DB, type Database } from './db/db.provider';
import { urls } from '@url-shortener/db-schemas';
import { envs } from './envs';
import { toBase62 } from 'src/utils/toBase62';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS') private redisClient: Redis,
    @Inject(DB) private database: Database,
  ) {}

  async writeUrl(
    url: string,
  ): Promise<{ shortCode: string; shortUrl: string; longUrl: string }> {
    const incr = await this.redisClient.incr('url:counter');
    const shortCode = toBase62(incr);

    await this.database.insert(urls).values({
      shortCode,
      longUrl: url,
    });

    return {
      shortCode,
      shortUrl: `${envs.BASE_URL}/${shortCode}`,
      longUrl: url,
    };
  }
}
