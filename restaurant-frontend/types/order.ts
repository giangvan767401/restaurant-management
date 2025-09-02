export interface OrderItemDTO {
  id?: number;
  quantity: number;
  orderId?: number;
  foodId?: number;
  foodName?: string;
  foodPrice?: number;
}

export interface OrderDTO {
  id?: number;
  orderTime?: string;
  status?: string;
  totalAmount?: number;
  customerId?: number;
  customerName?: string;
  customerLevel?: string;
  items?: OrderItemDTO[];
}
