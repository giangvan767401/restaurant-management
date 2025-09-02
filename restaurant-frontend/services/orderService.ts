import { apiFetch } from './api';
import type { OrderDTO } from '../types/order';

export const orderService = {
  list: (): Promise<OrderDTO[]> => apiFetch<OrderDTO[]>('/orders', { method: 'GET' }),
  get: (id: number) => apiFetch<OrderDTO>(`/orders/${id}`, { method: 'GET' }),
  create: (o: Partial<OrderDTO>) => apiFetch<OrderDTO>('/orders', { method: 'POST', body: JSON.stringify(o), auth: true }),
  remove: (id: number) => apiFetch<void>(`/orders/${id}`, { method: 'DELETE', auth: true }),
};
