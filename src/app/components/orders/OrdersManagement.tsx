import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye, Camera, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getOrders, deleteOrder } from "@/api";
import { getUserData } from "@/api/auth";

interface Order {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  user_id?: number;
  user_name?: string;
  user?: { name: string };
  invoice_number?: string;
  client_number?: string;
  delivery_photo?: string;
}

export function OrdersManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userData = getUserData();
  const userRole = userData?.role || "employee";

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

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de archivar este pedido?")) {
      return;
    }

    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
      alert("Pedido archivado exitosamente");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Error al archivar el pedido");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700" },
      "en-transito": { label: "En Tránsito", className: "bg-cyan-100 text-cyan-700" },
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700" },
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
        <h2 className="text-gray-900">Gestión de Pedidos</h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/portal/orders/archived")}
            className="text-gray-700"
          >
            Archivados
          </Button>
          <Button
            onClick={() => navigate("/portal/orders/new")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Nuevo Pedido
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Número Pedido</TableHead>
              <TableHead>Número Factura</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Pedido</TableHead>
              <TableHead>Monto Total</TableHead>
              <TableHead>Usuario</TableHead>
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
                  <TableCell>{order.id}</TableCell>
                  <TableCell className="font-medium text-purple-600">
                    {order.order_number || `PED-${order.id}`}
                  </TableCell>
                  <TableCell>{order.invoice_number || 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {order.created_at ? formatDate(order.created_at) : 'N/A'}
                  </TableCell>
                  <TableCell>{formatCurrency(order.total_amount || 0)}</TableCell>
                  <TableCell>{order.user?.name || order.user_name || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-500 text-white hover:bg-gray-600"
                        onClick={() => setPreviewOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => navigate(`/portal/orders/delivery-photo/${order.id}`)}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                      {(userRole === "admin" || userRole === "manager") && (
                        <Button
                          size="sm"
                          className="bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => navigate(`/portal/orders/edit/${order.id}`)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {userRole === "admin" && (
                        <Button
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!previewOrder} onOpenChange={(open) => !open && setPreviewOrder(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Detalles del Pedido #{previewOrder?.invoice_number || previewOrder?.id}
            </DialogTitle>
          </DialogHeader>
          
          {previewOrder && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-3">Información General</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between"><span className="text-gray-500">ID del Sistema:</span> <span className="font-medium">{previewOrder.id}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Número de Factura:</span> <span className="font-medium">{previewOrder.invoice_number || 'N/A'}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Cliente / Ref:</span> <span className="font-medium">{previewOrder.client_number || 'N/A'}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Estado:</span> <span>{getStatusBadge(previewOrder.status)}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Monto Total:</span> <span className="font-medium">{formatCurrency(previewOrder.total_amount || 0)}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Fecha de Creación:</span> <span className="font-medium">{previewOrder.created_at ? formatDate(previewOrder.created_at) : 'N/A'}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Creado por:</span> <span className="font-medium">{previewOrder.user?.name || previewOrder.user_name || 'N/A'}</span></p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="font-medium text-gray-900 mb-3">Foto de Entrega</h3>
                {previewOrder.delivery_photo ? (
                  <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={previewOrder.delivery_photo.startsWith('/storage/') ? `http://localhost:8000${previewOrder.delivery_photo}` : previewOrder.delivery_photo}
                      alt="Foto de entrega"
                      className="max-w-full max-h-[40vh] object-contain rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = previewOrder.delivery_photo || '';
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex-1 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                    <Camera className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-gray-500 text-sm">Este pedido aún no cuenta con una foto de entrega.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
