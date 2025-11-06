import { useQuery } from '@tanstack/react-query';

import { getDashboardStats } from '@/actions/dashboard/get-stats';

export const getUseDashboardStatsQueryKey = () => ['dashboard-stats'] as const;

export const useDashboardStats = () =>
  useQuery({
    queryKey: getUseDashboardStatsQueryKey(),
    queryFn: () => getDashboardStats(),
  });
