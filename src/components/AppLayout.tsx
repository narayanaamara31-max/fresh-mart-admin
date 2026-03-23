import { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { LayoutDashboard, ShoppingCart, Package, MoreHorizontal, RotateCcw, Layers, Truck, Users, LogOut, Leaf, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ConfirmDialog from '@/components/ConfirmDialog';

const tabs = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Orders', path: '/orders', icon: ShoppingCart },
  { label: 'Products', path: '/products', icon: Package },
  { label: 'More', path: '#more', icon: MoreHorizontal },
];

const drawerItems = [
  { label: 'Categories', path: '/categories', icon: Layers },
  { label: 'Returns', path: '/returns', icon: RotateCcw },
  { label: 'Delivery Boys', path: '/delivery-boys', icon: Truck },
  { label: 'Customers', path: '/customers', icon: Users },
];

const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleTabClick = (path: string) => {
    if (path === '#more') {
      setDrawerOpen(true);
    } else {
      navigate(path);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'Session cleared.' });
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 max-w-md mx-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-card shadow-xl flex flex-col animate-in slide-in-from-right">
            <div className="p-4 bg-primary text-primary-foreground">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold text-sm">
                    AD
                  </div>
                  <div>
                    <p className="font-semibold text-sm">FreshMart Admin</p>
                    <p className="text-xs opacity-80">+91 99999 99999</p>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 py-2">
              {drawerItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setDrawerOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive(item.path) ? 'bg-accent text-accent-foreground font-medium' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setDrawerOpen(false); setConfirmLogout(true); }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-destructive border-t"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <Outlet />

      {/* Bottom tabs */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t flex z-40">
        {tabs.map((tab) => {
          const active = tab.path === '#more' ? drawerOpen : isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <ConfirmDialog
        open={confirmLogout}
        onOpenChange={setConfirmLogout}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmLabel="Logout"
        destructive
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AppLayout;
