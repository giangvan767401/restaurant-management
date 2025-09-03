export type Role = 'CUSTOMER' | 'PHUCVU' | 'DAUBEP' | 'QUANLI' | '';

export function saveAuth(token: string, role: Role, username: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    console.log('Auth saved:', { token, role, username }); // Debug
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  console.log('getToken:', token); // Debug
  return token;
}

export function getRole(): Role {
  if (typeof window === 'undefined') return '';
  const role = (localStorage.getItem('role') as Role) || '';
  console.log('getRole:', role); // Debug
  return role;
}

export function getUsername(): string {
  if (typeof window === 'undefined') return '';
  const username = localStorage.getItem('username') || '';
  console.log('getUsername:', username); // Debug
  return username;
}

export function isLoggedIn(): boolean {
  const loggedIn = !!getToken();
  console.log('isLoggedIn:', loggedIn); // Debug
  return loggedIn;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    console.log('Logged out'); // Debug
    window.location.href = '/login';
  }
}