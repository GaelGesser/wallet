import { useQuery } from '@tanstack/react-query';

import { getWallets } from '@/actions/wallets/get-wallets';

export const getUseWalletsQueryKey = () => ['wallets'] as const;

export const useWallets = () =>
  useQuery({
    queryKey: getUseWalletsQueryKey(),
    queryFn: () => getWallets(),
  });
