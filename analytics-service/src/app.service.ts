import { Inject, Injectable } from '@nestjs/common';
import { type Database, DB } from './db/db.provider';
import { visited } from './db/schema';
import { sql } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(@Inject(DB) private database: Database) {}

  async registerShortCodeUsed(shortCode: string): Promise<void> {
    await this.database
      .insert(visited)
      .values({ shortCode, visitedTimes: 1 })
      .onConflictDoUpdate({
        target: visited.shortCode,
        set: {
          visitedTimes: sql`${visited.visitedTimes} + 1`,
          lastVisitedAt: sql`now()`,
        },
      });
  }
}
