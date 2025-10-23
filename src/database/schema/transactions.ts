import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { categories } from './categories';
import { users } from './users';
import { wallets } from './wallets';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'expense',
  'income',
  'transfer',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
  'paid',
  'pending',
  'canceled',
]);

export const transactions = pgTable('transactions', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text('name').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  amountInCents: integer('amount_in_cents').notNull().default(0),
  type: transactionTypeEnum('type').notNull().default('expense'),
  status: transactionStatusEnum('status').notNull().default('pending'),
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  walletId: uuid('wallet_id').references(() => wallets.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});
