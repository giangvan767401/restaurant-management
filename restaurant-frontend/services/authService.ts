import { apiFetch } from './api';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth';
import { saveAuth } from '../utils/auth';

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    // backend trả về user vừa đăng ký, mình normalize thành AuthResponse
    const user = await apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return user;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const txt = await apiFetch<string>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // parse "Login success as ROLE"
    const roleMatch = /as\s+(\w+)/i.exec(txt);
    const role = (roleMatch?.[1] || '').toUpperCase() as AuthResponse['role'];

    const token = btoa(`${payload.username}:${Date.now()}`);
    saveAuth(token, role, payload.username);

    return { token, username: payload.username, role };
  },
};
