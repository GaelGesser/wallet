import { useQuery } from '@tanstack/react-query';

import { getAccounts } from '@/actions/accounts/get-accounts';

export const getUseAccountsQueryKey = () => ['accounts'] as const;

export const useAccounts = () =>
  useQuery({
    queryKey: getUseAccountsQueryKey(),
    queryFn: () => getAccounts(),
  });
