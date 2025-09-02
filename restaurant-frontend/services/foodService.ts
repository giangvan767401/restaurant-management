import { apiFetch } from './api';
import type { ProductDTO } from '../types/product';

export const foodService = {
  list: (): Promise<ProductDTO[]> => apiFetch<ProductDTO[]>('/foods', { method: 'GET' }),
  create: (f: ProductDTO) => apiFetch<ProductDTO>('/foods', { method: 'POST', body: JSON.stringify(f), auth: true }),
  update: (id: number, f: ProductDTO) => apiFetch<ProductDTO>(`/foods/${id}`, { method: 'PUT', body: JSON.stringify(f), auth: true }),
  remove: (id: number) => apiFetch<void>(`/foods/${id}`, { method: 'DELETE', auth: true }),
};
