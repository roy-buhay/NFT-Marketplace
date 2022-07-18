const base_url = 'http://localhost:3000/'

export async function fetchWrapper<JSON = any>(
  // eslint-disable-next-line no-undef
  input: RequestInfo,
  // eslint-disable-next-line no-undef
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(`${base_url}${input}`, init);
  return res.json();
}
