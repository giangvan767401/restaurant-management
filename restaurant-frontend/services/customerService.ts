import { apiFetch } from './api';
import type { CustomerDTO } from '../types/customer';

export const customerService = {
  list: (): Promise<CustomerDTO[]> => apiFetch<CustomerDTO[]>('/customers', { method: 'GET' }),
  create: (c: CustomerDTO) => apiFetch<CustomerDTO>('/customers', { method: 'POST', body: JSON.stringify(c), auth: true }),
  update: (id: number, c: CustomerDTO) => apiFetch<CustomerDTO>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(c), auth: true }),
  remove: (id: number) => apiFetch<void>(`/customers/${id}`, { method: 'DELETE', auth: true }),
};
