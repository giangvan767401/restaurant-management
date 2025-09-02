import { apiFetch } from './api';
import type { UserDTO } from '../types/user';

export const userService = {
  list: () => apiFetch<UserDTO[]>('/users', { method: 'GET', auth: true }),
  create: (u: UserDTO) => apiFetch<UserDTO>('/users', { method: 'POST', body: JSON.stringify(u), auth: true }),
  get: (id: number) => apiFetch<UserDTO>(`/users/${id}`, { method: 'GET', auth: true }),
  update: (id: number, u: Partial<UserDTO>) => apiFetch<UserDTO>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(u), auth: true }),
  remove: (id: number) => apiFetch<void>(`/users/${id}`, { method: 'DELETE', auth: true }),
};
