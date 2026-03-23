import { Product, Category, Order, Customer, DeliveryBoy, ReturnRequest } from '@/types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200' },
  { id: 'cat-2', name: 'Leafy Greens', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200' },
  { id: 'cat-3', name: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200' },
  { id: 'cat-4', name: 'Gourds', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200' },
  { id: 'cat-5', name: 'Root Vegetables', imageUrl: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=200' },
  { id: 'cat-6', name: 'Herbs', imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=200' },
  { id: 'cat-7', name: 'Exotics', imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200' },
];

export const products: Product[] = [
  { id: 'p-1', name: 'Tomato', category: 'Vegetables', price: 40, unit: 'kg', stock: 50, imageUrl: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=200', isAvailable: true },
  { id: 'p-2', name: 'Onion', category: 'Vegetables', price: 35, unit: 'kg', stock: 80, imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200', isAvailable: true },
  { id: 'p-3', name: 'Potato', category: 'Root Vegetables', price: 30, unit: 'kg', stock: 100, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82ber7a?w=200', isAvailable: true },
  { id: 'p-4', name: 'Green Chilli', category: 'Vegetables', price: 60, unit: 'kg', stock: 8, imageUrl: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=200', isAvailable: true },
  { id: 'p-5', name: 'Capsicum', category: 'Vegetables', price: 80, unit: 'kg', stock: 15, imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200', isAvailable: true },
  { id: 'p-6', name: 'Spinach', category: 'Leafy Greens', price: 25, unit: 'bunch', stock: 30, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200', isAvailable: true },
  { id: 'p-7', name: 'Methi (Fenugreek)', category: 'Leafy Greens', price: 20, unit: 'bunch', stock: 5, imageUrl: 'https://images.unsplash.com/photo-1515696955266-4f67e13219e8?w=200', isAvailable: true },
  { id: 'p-8', name: 'Coriander', category: 'Leafy Greens', price: 15, unit: 'bunch', stock: 25, imageUrl: 'https://images.unsplash.com/photo-1592733172900-2a0e45cee7b4?w=200', isAvailable: true },
  { id: 'p-9', name: 'Curry Leaves', category: 'Herbs', price: 10, unit: 'bunch', stock: 40, imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=200', isAvailable: true },
  { id: 'p-10', name: 'Mint', category: 'Herbs', price: 15, unit: 'bunch', stock: 20, imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200', isAvailable: true },
  { id: 'p-11', name: 'Banana', category: 'Fruits', price: 50, unit: 'kg', stock: 60, imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200', isAvailable: true },
  { id: 'p-12', name: 'Apple', category: 'Fruits', price: 180, unit: 'kg', stock: 3, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200', isAvailable: true },
  { id: 'p-13', name: 'Mango', category: 'Fruits', price: 120, unit: 'kg', stock: 25, imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200', isAvailable: true },
  { id: 'p-14', name: 'Papaya', category: 'Fruits', price: 40, unit: 'piece', stock: 12, imageUrl: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=200', isAvailable: true },
  { id: 'p-15', name: 'Bottle Gourd', category: 'Gourds', price: 30, unit: 'piece', stock: 18, imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200', isAvailable: true },
  { id: 'p-16', name: 'Ridge Gourd', category: 'Gourds', price: 35, unit: 'kg', stock: 7, imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200', isAvailable: true },
  { id: 'p-17', name: 'Bitter Gourd', category: 'Gourds', price: 45, unit: 'kg', stock: 14, imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200', isAvailable: true },
  { id: 'p-18', name: 'Carrot', category: 'Root Vegetables', price: 50, unit: 'kg', stock: 35, imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200', isAvailable: true },
  { id: 'p-19', name: 'Beetroot', category: 'Root Vegetables', price: 40, unit: 'kg', stock: 22, imageUrl: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=200', isAvailable: true },
  { id: 'p-20', name: 'Radish', category: 'Root Vegetables', price: 25, unit: 'kg', stock: 6, imageUrl: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=200', isAvailable: false },
  { id: 'p-21', name: 'Dragon Fruit', category: 'Exotics', price: 250, unit: 'piece', stock: 4, imageUrl: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=200', isAvailable: true },
  { id: 'p-22', name: 'Avocado', category: 'Exotics', price: 200, unit: 'piece', stock: 9, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200', isAvailable: true },
  { id: 'p-23', name: 'Kiwi', category: 'Exotics', price: 180, unit: 'piece', stock: 2, imageUrl: 'https://images.unsplash.com/photo-1585059895524-72f83a8c8088?w=200', isAvailable: true },
  { id: 'p-24', name: 'Broccoli', category: 'Exotics', price: 90, unit: 'piece', stock: 11, imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200', isAvailable: true },
  { id: 'p-25', name: 'Mushroom', category: 'Exotics', price: 120, unit: 'kg', stock: 8, imageUrl: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=200', isAvailable: true },
];

const today = new Date();
const fmt = (d: Date) => d.toISOString();

export const orders: Order[] = [
  {
    orderId: 'ORD-001', customerId: 'c-1', customerName: 'Ramesh Kumar',
    items: [
      { productId: 'p-1', productName: 'Tomato', qty: 2, unit: 'kg', unitPrice: 40, lineTotal: 80 },
      { productId: 'p-2', productName: 'Onion', qty: 3, unit: 'kg', unitPrice: 35, lineTotal: 105 },
    ],
    subtotal: 185, discount: 10, deliveryCharge: 20, total: 195,
    address: '12, Gandhi Nagar, Jaggayyapeta', paymentMethod: 'Cash on Delivery',
    status: 'Placed', createdAt: fmt(today),
  },
  {
    orderId: 'ORD-002', customerId: 'c-2', customerName: 'Lakshmi Devi',
    items: [
      { productId: 'p-6', productName: 'Spinach', qty: 2, unit: 'bunch', unitPrice: 25, lineTotal: 50 },
      { productId: 'p-11', productName: 'Banana', qty: 1, unit: 'kg', unitPrice: 50, lineTotal: 50 },
    ],
    subtotal: 100, discount: 0, deliveryCharge: 20, total: 120,
    address: '45, Nehru Street, Jaggayyapeta', paymentMethod: 'UPI',
    status: 'Confirmed', createdAt: fmt(today),
  },
  {
    orderId: 'ORD-003', customerId: 'c-3', customerName: 'Suresh Reddy',
    items: [
      { productId: 'p-13', productName: 'Mango', qty: 3, unit: 'kg', unitPrice: 120, lineTotal: 360 },
    ],
    subtotal: 360, discount: 20, deliveryCharge: 0, total: 340,
    address: '78, Station Road, Jaggayyapeta', paymentMethod: 'Card',
    status: 'Out for Delivery', createdAt: fmt(new Date(today.getTime() - 86400000)), deliveryBoyId: 'd-1',
  },
  {
    orderId: 'ORD-004', customerId: 'c-1', customerName: 'Ramesh Kumar',
    items: [
      { productId: 'p-3', productName: 'Potato', qty: 5, unit: 'kg', unitPrice: 30, lineTotal: 150 },
      { productId: 'p-9', productName: 'Curry Leaves', qty: 1, unit: 'bunch', unitPrice: 10, lineTotal: 10 },
    ],
    subtotal: 160, discount: 0, deliveryCharge: 20, total: 180,
    address: '12, Gandhi Nagar, Jaggayyapeta', paymentMethod: 'Cash on Delivery',
    status: 'Delivered', createdAt: fmt(new Date(today.getTime() - 86400000 * 2)), deliveryBoyId: 'd-2',
  },
  {
    orderId: 'ORD-005', customerId: 'c-4', customerName: 'Priya Sharma',
    items: [
      { productId: 'p-21', productName: 'Dragon Fruit', qty: 2, unit: 'piece', unitPrice: 250, lineTotal: 500 },
    ],
    subtotal: 500, discount: 50, deliveryCharge: 0, total: 450,
    address: '23, MG Road, Jaggayyapeta', paymentMethod: 'UPI',
    status: 'Cancelled', createdAt: fmt(new Date(today.getTime() - 86400000 * 3)),
  },
  {
    orderId: 'ORD-006', customerId: 'c-5', customerName: 'Venkat Rao',
    items: [
      { productId: 'p-18', productName: 'Carrot', qty: 2, unit: 'kg', unitPrice: 50, lineTotal: 100 },
      { productId: 'p-19', productName: 'Beetroot', qty: 1, unit: 'kg', unitPrice: 40, lineTotal: 40 },
    ],
    subtotal: 140, discount: 0, deliveryCharge: 20, total: 160,
    address: '56, Temple Street, Jaggayyapeta', paymentMethod: 'Cash on Delivery',
    status: 'Placed', createdAt: fmt(today),
  },
  {
    orderId: 'ORD-007', customerId: 'c-2', customerName: 'Lakshmi Devi',
    items: [
      { productId: 'p-12', productName: 'Apple', qty: 1, unit: 'kg', unitPrice: 180, lineTotal: 180 },
      { productId: 'p-22', productName: 'Avocado', qty: 3, unit: 'piece', unitPrice: 200, lineTotal: 600 },
    ],
    subtotal: 780, discount: 80, deliveryCharge: 0, total: 700,
    address: '45, Nehru Street, Jaggayyapeta', paymentMethod: 'Card',
    status: 'Out for Delivery', createdAt: fmt(today), deliveryBoyId: 'd-3',
  },
  {
    orderId: 'ORD-008', customerId: 'c-3', customerName: 'Suresh Reddy',
    items: [
      { productId: 'p-5', productName: 'Capsicum', qty: 1, unit: 'kg', unitPrice: 80, lineTotal: 80 },
      { productId: 'p-10', productName: 'Mint', qty: 1, unit: 'bunch', unitPrice: 15, lineTotal: 15 },
      { productId: 'p-17', productName: 'Bitter Gourd', qty: 1, unit: 'kg', unitPrice: 45, lineTotal: 45 },
    ],
    subtotal: 140, discount: 0, deliveryCharge: 20, total: 160,
    address: '78, Station Road, Jaggayyapeta', paymentMethod: 'UPI',
    status: 'Delivered', createdAt: fmt(new Date(today.getTime() - 86400000 * 4)), deliveryBoyId: 'd-1',
  },
];

export const customers: Customer[] = [
  { id: 'c-1', name: 'Ramesh Kumar', mobile: '9876543210', addresses: ['12, Gandhi Nagar, Jaggayyapeta'], totalOrders: 5, totalSpent: 1250 },
  { id: 'c-2', name: 'Lakshmi Devi', mobile: '9876543211', addresses: ['45, Nehru Street, Jaggayyapeta'], totalOrders: 8, totalSpent: 3200 },
  { id: 'c-3', name: 'Suresh Reddy', mobile: '9876543212', addresses: ['78, Station Road, Jaggayyapeta'], totalOrders: 3, totalSpent: 980 },
  { id: 'c-4', name: 'Priya Sharma', mobile: '9876543213', addresses: ['23, MG Road, Jaggayyapeta', '10, Park Colony, Jaggayyapeta'], totalOrders: 6, totalSpent: 2800 },
  { id: 'c-5', name: 'Venkat Rao', mobile: '9876543214', addresses: ['56, Temple Street, Jaggayyapeta'], totalOrders: 2, totalSpent: 450 },
];

export const deliveryBoys: DeliveryBoy[] = [
  { id: 'd-1', name: 'Raju', mobile: '9001234567', isActive: true, assignedOrders: ['ORD-003', 'ORD-008'] },
  { id: 'd-2', name: 'Srinivas', mobile: '9001234568', isActive: true, assignedOrders: ['ORD-004'] },
  { id: 'd-3', name: 'Mahesh', mobile: '9001234569', isActive: false, assignedOrders: ['ORD-007'] },
];

export const returnRequests: ReturnRequest[] = [
  {
    id: 'ret-1', orderId: 'ORD-004', customerId: 'c-1', customerName: 'Ramesh Kumar',
    reason: 'Damaged product', description: 'Potatoes were rotten and had fungus. Need full refund.',
    photoUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82ber7a?w=200',
    status: 'Pending', createdAt: fmt(new Date(today.getTime() - 86400000)),
  },
  {
    id: 'ret-2', orderId: 'ORD-008', customerId: 'c-3', customerName: 'Suresh Reddy',
    reason: 'Wrong item delivered', description: 'Received regular gourd instead of bitter gourd.',
    photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200',
    status: 'Approved', createdAt: fmt(new Date(today.getTime() - 86400000 * 3)),
  },
  {
    id: 'ret-3', orderId: 'ORD-005', customerId: 'c-4', customerName: 'Priya Sharma',
    reason: 'Quality issue', description: 'Dragon fruits were overripe and mushy.',
    photoUrl: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=200',
    status: 'Rejected', createdAt: fmt(new Date(today.getTime() - 86400000 * 5)),
  },
];
