import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertCategory } from '@/actions/categories/upsert-category';
import type { UpsertCategorySchema } from '@/actions/categories/upsert-category/schema';
import { getUseCategoriesQueryKey } from '../queries/use-categories';

export const getUseUpsertCategoryMutationKey = () => ['upsertCategory'];

export const useUpsertCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseUpsertCategoryMutationKey(),
    mutationFn: async (data: UpsertCategorySchema) =>
      await upsertCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCategoriesQueryKey() });
    },
  });
};
