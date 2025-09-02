export interface ProductDTO {
  id?: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  available?: boolean;
  imageUrl?: string;
}
