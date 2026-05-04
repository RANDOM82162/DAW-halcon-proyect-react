import { useState, useEffect } from "react";
import { Eye, Package } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getOrders } from "@/api";

interface Order {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  delivery_date?: string;
  site_address?: string;
  items_count?: number;
}

export function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrders();
      const ordersList = Array.isArray(response) ? response : response.data || [];
      setOrders(ordersList);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Error al cargar los pedidos");
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
      cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700" },
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

  // Calculate statistics
  const stats = {
    pending: orders.filter((o) => o.status === "pendiente").length,
    inProcess: orders.filter((o) => o.status === "en-proceso").length,
    inTransit: orders.filter((o) => o.status === "en-transito").length,
    delivered: orders.filter((o) => o.status === "entregado").length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando pedidos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchOrders}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Mis Pedidos</h2>
          <p className="text-gray-600">Historial completo de sus pedidos de materiales</p>
        </div>
        <div className="bg-purple-100 px-4 py-2 rounded-lg">
          <span className="text-purple-700">Total de pedidos: {orders.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Pedido</TableHead>
              <TableHead>Fecha Pedido</TableHead>
              <TableHead>Fecha Entrega</TableHead>
              <TableHead>Sitio de Obra</TableHead>
              <TableHead>Artículos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No hay pedidos disponibles
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-purple-600">
                    {order.order_number || `PED-${order.id}`}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {order.created_at ? formatDate(order.created_at) : 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {order.delivery_date ? formatDate(order.delivery_date) : 'Pendiente'}
                  </TableCell>
                  <TableCell>{order.site_address || 'No especificado'}</TableCell>
                  <TableCell className="text-center">{order.items_count || 0}</TableCell>
                  <TableCell>{formatCurrency(order.total_amount || 0)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-yellow-600" />
            </div>
            <h4 className="text-gray-900">Pendientes</h4>
          </div>
          <p className="text-2xl text-gray-900">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-gray-900">En Proceso</h4>
          </div>
          <p className="text-2xl text-gray-900">{stats.inProcess}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-cyan-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-cyan-600" />
            </div>
            <h4 className="text-gray-900">En Tránsito</h4>
          </div>
          <p className="text-2xl text-gray-900">{stats.inTransit}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-gray-900">Entregados</h4>
          </div>
          <p className="text-2xl text-gray-900">{stats.delivered}</p>
        </div>
      </div>
    </div>
  );
}
            <div className="bg-cyan-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-cyan-600" />
            </div>
            <h4 className="text-gray-900">En Tránsito</h4>
          </div>
          <p className="text-2xl text-gray-900">
            {orders.filter((o) => o.status === "en-transito").length}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-gray-900">Entregados</h4>
          </div>
          <p className="text-2xl text-gray-900">
            {orders.filter((o) => o.status === "entregado").length}
          </p>
        </div>
      </div>
    </div>
  );
}
