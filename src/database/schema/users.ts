import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const userRoleEnum = pgEnum('user_role', [
  'ADMIN',
  'USER',
  'NONE',
  'OWNER',
]);

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn((): string => uuidv7()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
  role: userRoleEnum('role').notNull().default('NONE'),
});
