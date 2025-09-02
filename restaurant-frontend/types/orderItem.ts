import type { Food } from './food';
export interface OrderItem {
id?: number;
quantity: number;
order?: { id?: number };
food?: Food | { id: number };
foodId?: number; // supported by backend mapping
foodName?: string;
foodPrice?: number;
}