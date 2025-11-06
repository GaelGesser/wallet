import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTransaction } from '@/actions/transactions/upsert-transaction';
import type { UpsertTransactionSchema } from '@/actions/transactions/upsert-transaction/schema';
import { getUseDashboardStatsQueryKey } from '../queries/use-dashboard-stats';
import { getUseTransactionsQueryKey } from '../queries/use-transactions';

export const getUseUpsertTransactionMutationKey = () => ['upsertTransaction'];

export const useUpsertTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseUpsertTransactionMutationKey(),
    mutationFn: async (data: UpsertTransactionSchema) =>
      await upsertTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseTransactionsQueryKey() });
      queryClient.invalidateQueries({
        queryKey: getUseDashboardStatsQueryKey(),
      });
    },
  });
};
