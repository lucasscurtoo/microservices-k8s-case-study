import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const urls = pgTable('urls', {
  shortCode: text('short_code').primaryKey(),
  longUrl: text('long_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
