import { defineConfig } from 'drizzle-kit';
import { envs } from './src/envs';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: envs.DATABASE_URL },
});
