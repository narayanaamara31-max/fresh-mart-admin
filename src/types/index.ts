export type OrderStatus = 'Placed' | 'Confirmed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'Cash on Delivery' | 'UPI' | 'Card';
export type ReturnStatus = 'Pending' | 'Approved' | 'Rejected';
export type ProductUnit = 'kg' | 'bunch' | 'piece';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: ProductUnit;
  stock: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  qty: number;
  unit: ProductUnit;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  orderId: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  address: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  deliveryBoyId?: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  addresses: string[];
  totalOrders: number;
  totalSpent: number;
}

export interface DeliveryBoy {
  id: string;
  name: string;
  mobile: string;
  isActive: boolean;
  assignedOrders: string[];
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  reason: string;
  description: string;
  photoUrl: string;
  status: ReturnStatus;
  createdAt: string;
}
