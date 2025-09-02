import { apiFetch } from './api';
import type { PaymentDTO } from '../types/payment';

export const paymentService = {
  list: () => apiFetch<PaymentDTO[]>('/payments', { method: 'GET', auth: true }),
  create: (p: Partial<PaymentDTO>) => apiFetch<PaymentDTO>('/payments', { method: 'POST', body: JSON.stringify(p), auth: true }),
  get: (id: number) => apiFetch<PaymentDTO>(`/payments/${id}`, { method: 'GET', auth: true }),
  remove: (id: number) => apiFetch<void>(`/payments/${id}`, { method: 'DELETE', auth: true }),
};
