export type Transaction = {
  id: string;
  name: string;
  description: string | null;
  date: Date;
  amountInCents: number;
  type: 'expense' | 'income' | 'transfer';
  status: 'paid' | 'pending' | 'canceled';
  categoryId: string | null;
  categoryName: string | null;
  categoryIcon: string | null;
  wallet: {
    id: string;
    name: string;
  } | null;
};
