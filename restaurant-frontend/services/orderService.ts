import { apiFetch } from './api';
import type { OrderDTO, OrderItemDTO } from '../types/order';
import { getToken } from '../utils/auth';

export const orderService = {
  list: (): Promise<OrderDTO[]> => apiFetch<OrderDTO[]>('/orders', { method: 'GET', auth: false }),
  get: (id: number) => apiFetch<OrderDTO>(`/orders/${id}`, { method: 'GET', auth: false }),
  getItem: (id: number) => apiFetch<OrderItemDTO>(`/order-items/${id}`, { method: 'GET', auth: false }),
  create: (payload: Omit<OrderDTO, 'id' | 'itemIds'>) => {
    const token = getToken();
    if (!token) {
      throw new Error('No valid token found. Please log in again.');
    }
    return apiFetch<OrderDTO>('/orders', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    });
  },
  remove: (id: number) => {
    const token = getToken();
    if (!token) {
      throw new Error('No valid token found. Please log in again.');
    }
    return apiFetch<void>(`/orders/${id}`, { method: 'DELETE', auth: true });
  },
};