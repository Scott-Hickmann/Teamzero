export interface FetchApiParams<P = undefined> {
  path: string;
  payload?: P;
}

export async function fetchApi<T = undefined, P = undefined>({
  path,
  payload
}: FetchApiParams<P>): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload ?? {})
  });
  if (!response.ok) {
    const message = await response.text();
    throw message;
  }
  const json = await response.json();
  return json;
}
