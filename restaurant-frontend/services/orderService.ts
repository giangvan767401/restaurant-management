import { apiFetch } from './api';
import type { OrderDTO, OrderItemDTO } from '../types/order';

export const orderService = {
  list: (): Promise<OrderDTO[]> => apiFetch<OrderDTO[]>('/orders', { method: 'GET', auth: false }),
  get: (id: number) => apiFetch<OrderDTO>(`/orders/${id}`, { method: 'GET', auth: false }),
  create: (o: Partial<OrderDTO>) => apiFetch<OrderDTO>('/orders', { method: 'POST', body: JSON.stringify(o), auth: false }),
  remove: (id: number) => apiFetch<void>(`/orders/${id}`, { method: 'DELETE', auth: true }),
  getItem: (id: number) => apiFetch<OrderItemDTO>(`/order-items/${id}`, { method: 'GET', auth: false }),
};