import { createBrowserRouter, Navigate } from "react-router";
import { PublicSearchPage } from "./components/PublicSearchPage";
import { LoginPage } from "./components/LoginPage";
import { OrderDetailsPublic } from "./components/OrderDetailsPublic";
import { PortalLayout } from "./components/PortalLayout";
import { PortalDashboard } from "./components/PortalDashboard";
import { OrdersManagement } from "./components/orders/OrdersManagement";
import { ArchivedOrders } from "./components/orders/ArchivedOrders";
import { OrderForm } from "./components/orders/OrderForm";
import { OrderDeliveryPhoto } from "./components/orders/OrderDeliveryPhoto";
import { UsersManagement } from "./components/users/UsersManagement";
import { UserForm } from "./components/users/UserForm";
import { InventoryManagement } from "./components/inventory/InventoryManagement";
import { InventoryForm } from "./components/inventory/InventoryForm";
import { Support } from "./components/Support";
import { ProfilePage } from "./components/ProfilePage";
import { NotFound } from "./components/NotFound";

export const createRouter = (isLoggedIn: boolean, onLogin: (email: string) => void, onLogout: () => void, userName: string) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <PublicSearchPage />,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/portal" replace /> : <LoginPage onLogin={onLogin} />,
    },
    {
      path: "/order/:orderId",
      element: <OrderDetailsPublic />,
    },
    {
      path: "/portal",
      element: isLoggedIn ? <PortalLayout onLogout={onLogout} userName={userName} /> : <Navigate to="/login" replace />,
      children: [
        {
          index: true,
          element: <PortalDashboard />,
        },
        {
          path: "orders",
          element: <OrdersManagement />,
        },
        {
          path: "orders/archived",
          element: <ArchivedOrders />,
        },
        {
          path: "orders/new",
          element: <OrderForm />,
        },
        {
          path: "orders/edit/:orderId",
          element: <OrderForm />,
        },
        {
          path: "orders/delivery-photo/:orderId",
          element: <OrderDeliveryPhoto />,
        },
        {
          path: "users",
          element: <UsersManagement />,
        },
        {
          path: "users/new",
          element: <UserForm />,
        },
        {
          path: "users/edit/:userId",
          element: <UserForm />,
        },
        {
          path: "inventory",
          element: <InventoryManagement />,
        },
        {
          path: "inventory/new",
          element: <InventoryForm />,
        },
        {
          path: "inventory/edit/:inventoryId",
          element: <InventoryForm />,
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};
