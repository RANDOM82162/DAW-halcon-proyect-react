import { useNavigate } from "react-router";
import { Package, Plus, ArrowRight, TrendingUp, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function PortalDashboard() {
  const navigate = useNavigate();

  const recentOrders = [
    {
      id: "PED-2026-089",
      date: "2026-04-25",
      status: "pendiente",
      items: 15,
      total: "$22,100",
    },
    {
      id: "PED-2026-045",
      date: "2026-04-20",
      status: "en-proceso",
      items: 8,
      total: "$8,500",
    },
    {
      id: "PED-2026-033",
      date: "2026-04-18",
      status: "en-transito",
      items: 10,
      total: "$12,300",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700" },
      "en-transito": { label: "En Tránsito", className: "bg-cyan-100 text-cyan-700" },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700" },
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Bienvenido a su Portal</h2>
        <p className="text-gray-600">Gestione sus pedidos de materiales de construcción</p>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-4 rounded-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">Mis Pedidos</h3>
              <p className="text-gray-600 mb-4">
                Consulte el historial y estado de todos sus pedidos
              </p>
              <Button
                onClick={() => navigate("/portal/orders")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Ver Pedidos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="bg-green-500 p-4 rounded-lg">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">Nuevo Pedido</h3>
              <p className="text-gray-600 mb-4">
                Solicite materiales para su proyecto de construcción
              </p>
              <Button
                onClick={() => navigate("/portal/orders/new")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Crear Pedido
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <h4 className="text-gray-700">Pedidos Activos</h4>
          </div>
          <p className="text-3xl text-gray-900">2</p>
          <p className="text-gray-600 text-sm mt-1">En proceso y tránsito</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-gray-700">Total Entregados</h4>
          </div>
          <p className="text-3xl text-gray-900">12</p>
          <p className="text-gray-600 text-sm mt-1">Este mes</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-gray-700">Monto Total</h4>
          </div>
          <p className="text-3xl text-gray-900">$42,900</p>
          <p className="text-gray-600 text-sm mt-1">Pedidos activos</p>
        </div>
      </div>

      {/* Recent Orders Summary */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Resumen de Pedidos Recientes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900">{order.id}</h4>
                    <p className="text-gray-500 text-sm">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Artículos</p>
                    <p className="text-gray-900">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="text-gray-900">{order.total}</p>
                  </div>
                  <div className="min-w-[120px]">
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 text-center">
          <button
            onClick={() => navigate("/portal/orders")}
            className="text-purple-600 hover:text-purple-700"
          >
            Ver todos los pedidos →
          </button>
        </div>
      </div>
    </div>
  );
}
