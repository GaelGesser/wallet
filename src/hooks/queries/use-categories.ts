import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/actions/categories/get-categories';

export const getUseCategoriesQueryKey = () => ['categories'] as const;

export const useCategories = () =>
  useQuery({
    queryKey: getUseCategoriesQueryKey(),
    queryFn: () => getCategories(),
  });
