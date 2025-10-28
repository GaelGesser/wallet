import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertTransaction } from '@/actions/transactions/upsert-transaction';
import type { UpsertTransactionSchema } from '@/actions/transactions/upsert-transaction/schema';

export const getUseUpsertTransactionMutationKey = () => ['upsertTransaction'];

export const useUpsertTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseUpsertTransactionMutationKey(),
    mutationFn: async (data: UpsertTransactionSchema) =>
      await upsertTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};
