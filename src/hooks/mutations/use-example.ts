import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exampleAction } from '@/actions/example';
import type { ExampleSchema } from '@/actions/example/schema';
import { getUseExampleQueryKey } from '../queries/use-example';

export const getUseExampleMutationKey = () => ['example'];

export const useExample = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseExampleMutationKey(),
    mutationFn: async (data: ExampleSchema) => await exampleAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseExampleQueryKey() });
    },
  });
};
