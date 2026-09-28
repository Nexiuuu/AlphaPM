export async function apiFetch(
  url: string,
  options: RequestInit = {},
  accessToken?: string,
  sendAsJson: boolean = true,
) {
  return fetch(url, {
    ...options,
    headers: {
      ...(sendAsJson ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
}
