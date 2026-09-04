export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status $ {response.status}`);
  }

  const data: unknown = await response.json();
  return data as T;
}

//Vad skickar jag, vad får jag tillbaka? TBody -> vad skickar jag / TResponse -> vad får jag tillbaka
export async function post<TBody, TResponse>(
  url: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  return data as TResponse;
}
