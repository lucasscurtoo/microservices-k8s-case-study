import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { Pool } from 'pg';
import { envs } from '../envs';
import * as schema from '@url-shortener/db-schemas';

export const DB = 'DB';

export type Database = NodePgDatabase<typeof schema> & { $client: Pool };

export const dbProvider = {
  provide: DB,
  useFactory: (): Database =>
    drizzle({ connection: envs.DATABASE_URL, schema }),
};
