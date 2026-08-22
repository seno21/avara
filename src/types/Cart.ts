import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'qris' | 'cod';
  cardNumber?: string;
  cardExp?: string;
  cardCvc?: string;
  notes?: string;
}
