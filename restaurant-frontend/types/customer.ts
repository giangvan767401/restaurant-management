import type { ProductDTO } from './product';

export interface CustomerDTO {
  id?: number;
  name: string;
  gender?: string;
  age?: number;
  phone?: string;
  email?: string;
  address?: string;
  level?: string;
  selectedFoods?: ProductDTO[];
}
