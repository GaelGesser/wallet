import { accounts } from './accounts';
import { categories } from './categories';
import { sessions } from './sessions';
import { tags } from './tags';
import { transactionTags } from './transaction-tags';
import { transactions } from './transactions';
import { users } from './users';
import { verifications } from './verifications';
import { wallets } from './wallets';

export const schema = {
  accounts,
  sessions,
  users,
  verifications,

  categories,
  tags,
  transactionTags,
  transactions,
  wallets,
};
