// types/auth.ts
export type Role = 'CUSTOMER' | 'PHUCVU' | 'DAUBEP' | 'QUANLI';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: Role;
}
