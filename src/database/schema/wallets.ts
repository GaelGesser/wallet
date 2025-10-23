import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { users } from './users';

export const walletTypeEnum = pgEnum('wallet_type', [
  'checking',
  'savings',
  'credit',
  'cash',
]);

export const wallets = pgTable('wallets', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text('name').notNull(),
  type: walletTypeEnum('type').notNull().default('checking'),
  color: text('color').notNull().default('#ffffff'),
  icon: text('icon').notNull().default('credit-card'),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  isDefault: boolean('is_default').notNull().default(false),
  balanceInCents: integer('balance_in_cents').notNull().default(0),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});
