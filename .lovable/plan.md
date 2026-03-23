
# FreshMart Jaggayyapeta — Admin Mobile Web App

## Overview
A mobile-first admin dashboard for FreshMart grocery store in Jaggayyapeta, built as a responsive web app with PWA-like feel. All data is mock/local — no backend.

## Design System
- **Primary green**: hsl(142, 76%, 36%) with emerald/lime accents
- **Currency**: ₹ (Indian Rupee) throughout
- **Mobile-first** layout optimized for phone screens
- **Clean typography** with clear hierarchy using shadcn/ui components styled with the green theme

## State Management
- **Zustand stores**: authStore, productStore, categoryStore, orderStore, returnStore, customerStore, deliveryStore
- **LocalStorage** persistence for auth session
- Mock data loaded on app init

## Mock Data
- **25 products** across 7 categories (Vegetables, Leafy Greens, Fruits, Gourds, Root Vegetables, Herbs, Exotics)
- **8 orders** with various statuses (Placed/Confirmed/Out for Delivery/Delivered/Cancelled)
- **5 customers**, **3 delivery boys**, **3 return requests**

## Authentication Flow (2 screens)
1. **Mobile Number Entry** — 10-digit input, hardcoded admin number 9999999999, "Send OTP" button
2. **OTP Verification** — 6-box digit input, 30s resend timer, any 6 digits accepted, session persisted

## Dashboard (Home)
- 2×2 stat cards: Today's Orders, Revenue, Pending, Out for Delivery
- Recent 5 orders as tappable cards with color-coded StatusBadge
- Low stock alerts (stock < 10)

## Orders
- Filter chips by status and date range
- Order list with pull-to-refresh
- **Order Detail**: items list, pricing breakdown, address, status update dropdown, delivery boy assignment

## Products
- Search bar + category filter chips
- Product rows with availability toggle, swipe edit/delete
- **Add/Edit Product** form with React Hook Form + Zod validation

## Supporting Screens
- **Returns**: Pending/Approved/Rejected tabs, detail bottom sheet with approve/reject
- **Categories**: List with product count, add/edit/delete via modals
- **Delivery Boys**: List with active toggle, add via modal
- **Customers**: Searchable list, detail bottom sheet with order history

## Navigation
- **Bottom tab bar**: Dashboard, Orders, Products, More
- **More** opens drawer/menu with: Categories, Returns, Delivery Boys, Customers, Logout
- Active tab highlighted in primary green

## Shared Components
- StatCard, StatusBadge, OrderCard, ProductRow
- EmptyState, LoadingSkeleton (500ms shimmer), ToastMessage, ConfirmDialog, SearchBar

## UX Polish
- All destructive actions use ConfirmDialog
- All mutations show toast notifications
- Loading skeletons on first mount
- Empty states on all list screens
- Drawer header: admin avatar initials, name, masked mobile
- Logout clears session and returns to login
