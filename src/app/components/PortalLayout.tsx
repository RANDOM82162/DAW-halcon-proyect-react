import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Package, Users, Box, HelpCircle, LogOut, ChevronRight, User as UserIcon, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PortalLayoutProps {
  onLogout: () => void;
  userName: string;
  userRole: string;
}

export function PortalLayout({ onLogout, userName, userRole }: PortalLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseMenuItems = [
    { path: "/portal", label: "Dashboard", icon: Home },
    { path: "/portal/orders", label: "Pedidos", icon: Package },
    { path: "/portal/users", label: "Usuarios", icon: Users, roles: ["admin"] },
    { path: "/portal/inventory", label: "Inventario", icon: Box },
    { path: "/portal/support", label: "Soporte", icon: HelpCircle },
  ];

  const menuItems = baseMenuItems.filter(item => !item.roles || item.roles.includes(userRole));

  const getBreadcrumb = () => {
    if (location.pathname.includes("/orders/new")) return "Nuevo Pedido";
    if (location.pathname.includes("/orders/edit")) return "Editar Pedido";
    if (location.pathname.includes("/orders/archived")) return "Pedidos Archivados";
    if (location.pathname.includes("/users/new")) return "Nuevo Usuario";
    if (location.pathname.includes("/users/edit")) return "Editar Usuario";
    if (location.pathname.includes("/inventory/new")) return "Nuevo Inventario";
    if (location.pathname.includes("/inventory/edit")) return "Editar Inventario";
    if (location.pathname.includes("/portal/profile")) return "Editar Perfil";

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

  // Get profile photo from localStorage
  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const profilePhoto = userData?.profile_photo;

  const getPhotoUrl = () => {
    if (!profilePhoto) return null;
    if (profilePhoto.startsWith("http")) return profilePhoto;
    if (profilePhoto.startsWith("/storage/")) return `http://localhost:8000${profilePhoto}`;
    return profilePhoto;
  };

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

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors cursor-pointer"
            >
              <span className="text-gray-700 capitalize">{userName}</span>
              <Avatar className="w-9 h-9">
                {getPhotoUrl() && (
                  <AvatarImage src={getPhotoUrl()!} alt={userName} className="object-cover" />
                )}
                <AvatarFallback className="bg-purple-600 text-white text-sm">{initials}</AvatarFallback>
              </Avatar>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 capitalize">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userData?.email || ""}</p>
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/portal/profile");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Editar Perfil
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
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
