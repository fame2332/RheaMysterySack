export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounts/sales
  imageUrl: string;
  category: string;
  code: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  variations?: ProductVariation[];
  isOnSale?: boolean;
  saleEnds?: string;
  soldCount: number;
}

export interface ProductVariation {
  id: string;
  name: string;
  options: string[];
  price?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariations?: Record<string, string>;
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  name?: string;
  address?: string;
  billingAddress?: string;
  wishlist: string[]; // Product IDs
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinedDate: string;
}

export interface PaymentMethod {
  id: string;
  name: 'GCash' | 'PayMaya' | 'UnionBank';
  icon: string;
}

export interface DeliveryMethod {
  id: string;
  name: 'Store Pickup' | 'Cash on Delivery' | 'Meetup';
  description: string;
  availableLocations?: string[];
  estimatedDays?: string;
  fee?: number;
}

export interface CheckoutDetails {
  name: string;
  phoneNumber: string;
  address: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful: number;
  reply?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  address: string;
  estimatedDelivery?: string;
}

export interface FlashSale {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  products: {
    productId: string;
    discountPercentage: number;
    quantity: number;
    soldCount: number;
  }[];
}

export interface Voucher {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minSpend?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
}