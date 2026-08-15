import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const visited = pgTable('visited', {
  shortCode: text('short_code').primaryKey(),
  visitedTimes: integer('visited_times').notNull().default(0),
  firstVisitedAt: timestamp('first_visited_at').notNull().defaultNow(),
  lastVisitedAt: timestamp('last_visited_at').notNull().defaultNow(),
});
