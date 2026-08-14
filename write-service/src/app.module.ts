import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Redis from 'ioredis';
import { envs } from './envs';
import { DB, dbProvider, type Database } from './db/db.provider';

const redisProvider = {
  provide: 'REDIS',
  useFactory: () => {
    return new Redis({
      host: envs.REDIS_HOST,
      port: +envs.REDIS_PORT,
    });
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, redisProvider, dbProvider],
})
export class AppModule implements OnModuleDestroy {
  constructor(
    @Inject('REDIS') private readonly redis: Redis,
    @Inject(DB) private readonly db: Database,
  ) {}

  async onModuleDestroy() {
    await this.redis.quit();
    await this.db.$client.end();
  }
}
