import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Package, Users, Box, HelpCircle, LogOut } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface PortalLayoutProps {
  onLogout: () => void;
  userName: string;
}

export function PortalLayout({ onLogout, userName }: PortalLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/portal", label: "Dashboard", icon: Home },
    { path: "/portal/orders", label: "Pedidos", icon: Package },
    { path: "/portal/users", label: "Usuarios", icon: Users },
    { path: "/portal/inventory", label: "Inventario", icon: Box },
    { path: "/portal/support", label: "Soporte", icon: HelpCircle },
  ];

  const getBreadcrumb = () => {
    if (location.pathname.includes("/orders/new")) return "Nuevo Pedido";
    if (location.pathname.includes("/orders/edit")) return "Editar Pedido";
    if (location.pathname.includes("/orders/archived")) return "Pedidos Archivados";
    if (location.pathname.includes("/users/new")) return "Nuevo Usuario";
    if (location.pathname.includes("/users/edit")) return "Editar Usuario";
    if (location.pathname.includes("/inventory/new")) return "Nuevo Inventario";
    if (location.pathname.includes("/inventory/edit")) return "Editar Inventario";

    const breadcrumbs: Record<string, string> = {
      "/portal": "Dashboard",
      "/portal/orders": "Gestión de Pedidos",
      "/portal/users": "Gestión de Usuarios",
      "/portal/inventory": "Gestión de Inventario",
      "/portal/support": "Soporte",
    };
    return breadcrumbs[location.pathname] || "Dashboard";
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "CL";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen fixed left-0 top-0 bottom-0 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl text-white">Constructora Halcon</h1>
          <p className="text-gray-400 text-sm mt-1">Portal de Pedidos</p>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/portal"
                ? location.pathname === "/portal"
                : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 fixed top-0 left-64 right-0 z-10">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <span>Inicio</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{getBreadcrumb()}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-700 capitalize">{userName}</span>
            <Avatar>
              <AvatarFallback className="bg-purple-600 text-white">{initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 pt-16">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
