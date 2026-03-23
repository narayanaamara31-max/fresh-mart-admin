import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "@/stores/authStore";
import AppLayout from "@/components/AppLayout";
import MobileEntryScreen from "@/pages/MobileEntryScreen";
import OTPScreen from "@/pages/OTPScreen";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import OrderDetail from "@/pages/OrderDetail";
import Products from "@/pages/Products";
import ProductForm from "@/pages/ProductForm";
import Returns from "@/pages/Returns";
import Categories from "@/pages/Categories";
import DeliveryBoys from "@/pages/DeliveryBoys";
import Customers from "@/pages/Customers";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GuestGuard><MobileEntryScreen /></GuestGuard>} />
          <Route path="/otp" element={<GuestGuard><OTPScreen /></GuestGuard>} />
          <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:productId" element={<ProductForm />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/delivery-boys" element={<DeliveryBoys />} />
            <Route path="/customers" element={<Customers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
