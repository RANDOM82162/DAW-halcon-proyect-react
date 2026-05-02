import {
  Search,
  Plus,
  Package,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeSection, onSectionChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "search", label: "Buscar Pedidos", icon: Search },
    { id: "new", label: "Nuevo Pedido", icon: Plus },
    { id: "orders", label: "Mis Pedidos", icon: Package },
    { id: "support", label: "Soporte", icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen fixed left-0 top-0 bottom-0 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl text-white">Constructora Halcon</h1>
        <p className="text-gray-400 text-sm mt-1">Portal de Pedidos</p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                activeSection === item.id
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
  );
}
