import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/data/categories/get";

export const getUseCategoryQueryKey = () => ["category"] as const;

export const useCategorys = (params?: {
  initialData?: Awaited<ReturnType<typeof getCategories>>;
}) => {
  return useQuery({
    queryKey: getUseCategoryQueryKey(),
    queryFn: () => getCategories(),
    initialData: params?.initialData,
  });
};
