import { apiFetch } from './api';
import type { PaymentDTO } from '../types/payment';

export const paymentService = {
  list: () => apiFetch<PaymentDTO[]>('/payments', { method: 'GET', auth: false }),
  create: (p: Partial<PaymentDTO>) => apiFetch<PaymentDTO>('/payments', { method: 'POST', body: JSON.stringify(p), auth: false }),
  get: (id: number) => apiFetch<PaymentDTO>(`/payments/${id}`, { method: 'GET', auth: false }),
  remove: (id: number) => apiFetch<void>(`/payments/${id}`, { method: 'DELETE', auth: true }),
};