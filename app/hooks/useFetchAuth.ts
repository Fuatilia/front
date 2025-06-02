import { useQuery } from '@tanstack/react-query';

type FetchOptions<T> = {
  url: string;
  queryKey: string[];
  select?: (data: any) => T;
  enabled?: boolean;
};

export function useFetchAuth<T = any>({
  url,
  queryKey,
  select,
  enabled = true,
}: FetchOptions<T>) {
  const fetchWithToken = async (): Promise<T> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Access token not found');

    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Failed to fetch');
    }

    return res.json();
  };

  return useQuery<T>({
    queryKey,
    queryFn: fetchWithToken,
    select,
    enabled,
  });
}
