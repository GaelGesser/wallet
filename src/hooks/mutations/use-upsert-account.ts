import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertAccount } from '@/actions/accounts/upsert-account';
import type { UpsertAccountSchema } from '@/actions/accounts/upsert-account/schema';
import { getUseAccountsQueryKey } from '../queries/use-accounts';

export const getUseUpsertAccountMutationKey = () => ['upsertAccount'];

export const useUpsertAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseUpsertAccountMutationKey(),
    mutationFn: async (data: UpsertAccountSchema) => await upsertAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseAccountsQueryKey() });
    },
  });
};
