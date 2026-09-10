export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  secondaryImages?: string[];
  inStock: boolean;
  stockCount: number;
  category: 'leather' | 'wear' | 'accessories' | 'fragrance' | 'home';
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  material?: string;
  dimensions?: string;
  shopeeUrl?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
