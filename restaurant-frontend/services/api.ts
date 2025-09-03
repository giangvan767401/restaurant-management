export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8081';

type FetchOptions = RequestInit & { auth?: boolean };

export async function apiFetch<T = unknown>(
  path: string,
  opts: FetchOptions = {}
): Promise<T> {
  const { auth = false, ...rest } = opts;
  const headers = new Headers(opts.headers || {});
  headers.set('Content-Type', 'application/json; charset=UTF-8');

  if (auth) {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('No token found for auth request');
    }
  }

  console.log(`API request: ${rest.method || 'GET'} ${path}`, {
    headers: Object.fromEntries(headers),
    body: rest.body,
  });

  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers });

  if (!res.ok) {
    const txt = await res.text();
    console.error(`API error: ${rest.method || 'GET'} ${path} - HTTP ${res.status}`, txt);
    throw new Error(txt || `HTTP ${res.status}`);
  }

  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json() : await res.text();
  console.log(`API response: ${rest.method || 'GET'} ${path}`, data);
  return data as T;
}