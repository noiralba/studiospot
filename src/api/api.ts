export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status $ {response.status}`);
  }

  const data: unknown = await response.json();
  return data as T;
}
