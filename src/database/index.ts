import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/env';
import { schema } from './schema';

export const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: 'snake_case',
});
