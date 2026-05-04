import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Package, Plus, ArrowRight, TrendingUp, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getOrders } from "@/api";

interface Order {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  items_count?: number;
}

export function PortalDashboard() {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    activeOrders: 0,
    deliveredOrders: 0,
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrders();
      const allOrders = Array.isArray(response) ? response : response.data || [];

      // Show only 3 most recent
      setRecentOrders(allOrders.slice(0, 3));

      // Calculate stats from ALL orders
      const activeOrders = allOrders.filter((order: Order) =>
        order.status === 'pendiente' || order.status === 'en-proceso' || order.status === 'en-transito'
      ).length;

      const deliveredOrders = allOrders.filter((order: Order) => order.status === 'entregado').length;

      const totalAmount = allOrders
        .filter((order: Order) => order.status !== 'entregado')
        .reduce((sum: number, order: Order) => sum + (Number(order.total_amount) || 0), 0);

      setStats({
        activeOrders,
        deliveredOrders,
        totalAmount,
      });
    } catch (err) {
      console.error("Error fetching recent orders:", err);
      setError("Error al cargar los pedidos recientes");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700" },
      "en-transito": { label: "En Tránsito", className: "bg-cyan-100 text-cyan-700" },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700" },
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
    };
    const variant = variants[status as keyof typeof variants] || variants.pendiente;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchRecentOrders}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white"
        >
          Reintentar
        </Button>
      </div>
    );
  }

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
          <p className="text-3xl text-gray-900">{stats.activeOrders}</p>
          <p className="text-gray-600 text-sm mt-1">En proceso y tránsito</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-gray-700">Total Entregados</h4>
          </div>
          <p className="text-3xl text-gray-900">{stats.deliveredOrders}</p>
          <p className="text-gray-600 text-sm mt-1">Este mes</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-gray-700">Monto Total</h4>
          </div>
          <p className="text-3xl text-gray-900">{formatCurrency(stats.totalAmount)}</p>
          <p className="text-gray-600 text-sm mt-1">Pedidos activos</p>
        </div>
      </div>

      {/* Recent Orders Summary */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-900">Resumen de Pedidos Recientes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay pedidos recientes
            </div>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/portal/orders/${order.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">{order.order_number || `PED-${order.id}`}</h4>
                      <p className="text-gray-500 text-sm">
                        {order.created_at ? formatDate(order.created_at) : 'Fecha no disponible'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Artículos</p>
                      <p className="text-gray-900">{order.items_count || 0}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Total</p>
                      <p className="text-gray-900">{formatCurrency(order.total_amount || 0)}</p>
                    </div>
                    <div className="min-w-[120px]">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
