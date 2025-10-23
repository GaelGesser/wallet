import { useQuery } from '@tanstack/react-query';

import { exampleAction } from '@/actions/example';

export const getUseExampleQueryKey = () => ['example'] as const;

export const useExample = (params?: {
  initialData?: Awaited<ReturnType<typeof exampleAction>>;
}) =>
  useQuery({
    queryKey: getUseExampleQueryKey(),
    queryFn: () => exampleAction({ name: 'Example' }),
    initialData: params?.initialData,
  });
