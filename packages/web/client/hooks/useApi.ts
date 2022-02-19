import useSWR from 'swr';

import { fetchApi, FetchApiParams } from '../fetchApi';

export function useApi<T = undefined, P = undefined>(
  params?: FetchApiParams<P>
) {
  return useSWR(
    params
      ? params.payload
        ? [params.path, JSON.stringify(params.payload)]
        : params.path
      : undefined,
    () => (params ? fetchApi<T, P>(params) : undefined)
  );
}
