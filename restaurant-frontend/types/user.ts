export interface UserDTO {
  id?: number;
  username: string;
  password?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role: 'CUSTOMER' | 'PHUCVU' | 'DAUBEP' | 'QUANLI' | string;
}
