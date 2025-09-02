export interface PaymentDTO {
  id?: number;
  method: string; // CASH, CARD, MOMO...
  amount?: number;
  status?: string;
  orderId?: number;
  orderStatus?: string;
}
