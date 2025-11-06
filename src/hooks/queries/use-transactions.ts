import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '@/actions/transactions/get-transactions';

export const getUseTransactionsQueryKey = () => ['transactions'] as const;

export const useTransactions = () =>
  useQuery({
    queryKey: getUseTransactionsQueryKey(),
    queryFn: () => getTransactions(),
  });
