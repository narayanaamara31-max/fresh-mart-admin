import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LayoutDashboard, ShoppingCart, Package, Users, Truck, RotateCcw, LayoutGrid } from "lucide-react-native";
import { useAuthStore } from "@/src/stores/authStore";
import { Redirect } from "expo-router";

export default function AppLayout() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
     return <Redirect href="/(auth)/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ 
        headerShown: true,
        drawerActiveTintColor: "#2563eb",
        drawerInactiveTintColor: "#64748b",
      }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
            drawerIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="orders/index"
          options={{
            drawerLabel: "Orders",
            title: "Orders",
            drawerIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="products/index"
          options={{
            drawerLabel: "Products",
            title: "Products",
            drawerIcon: ({ color, size }) => <Package size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="categories"
          options={{
            drawerLabel: "Categories",
            title: "Categories",
            drawerIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="delivery-boys"
          options={{
            drawerLabel: "Delivery Boys",
            title: "Delivery Boys",
            drawerIcon: ({ color, size }) => <Truck size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="customers"
          options={{
            drawerLabel: "Customers",
            title: "Customers",
            drawerIcon: ({ color, size }) => <Users size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="returns"
          options={{
            drawerLabel: "Returns",
            title: "Returns",
            drawerIcon: ({ color, size }) => <RotateCcw size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
