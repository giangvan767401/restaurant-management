export type Role = 'CUSTOMER' | 'PHUCVU' | 'DAUBEP' | 'QUANLI' | '';

export function saveAuth(token: string, role: Role, username: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function getRole(): Role {
  if (typeof window === 'undefined') return '';
  return (localStorage.getItem('role') as Role) || '';
}

export function getUsername(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('username') || '';
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    window.location.href = '/login';
  }
}
