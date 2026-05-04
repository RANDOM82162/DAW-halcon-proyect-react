import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RotateCcw } from "lucide-react";
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
import { getOrders, restoreOrder, deleteOrder, deleteOrderPermanently } from "@/api";

interface Order {
  id: number;
  customer_number: string;
  invoice_number: string;
  status: string;
  order_date: string;
  total_amount: number;
  user?: { name?: string };
  deleted_at?: string | null;
}

export function ArchivedOrders() {
  const navigate = useNavigate();
  const [archivedOrders, setArchivedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArchivedOrders();
  }, []);

  const fetchArchivedOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrders({ archived: true });
      const ordersList = Array.isArray(response) ? response : response.data || [];
      setArchivedOrders(ordersList);
    } catch (err) {
      console.error("Error fetching archived orders:", err);
      setError("Error al cargar los pedidos archivados");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: number) => {
    if (!confirm("¿Desea restaurar este pedido?")) {
      return;
    }

    try {
      await restoreOrder(id);
      setArchivedOrders(archivedOrders.filter((order) => order.id !== id));
      alert("Pedido restaurado exitosamente");
    } catch (err) {
      console.error("Error restoring order:", err);
      alert("Error al restaurar el pedido");
    }
  };

  const handlePermanentDelete = async (id: number) => {
    if (!confirm("¿Desea eliminar este pedido definitivamente? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await deleteOrderPermanently(id);
      setArchivedOrders(archivedOrders.filter((order) => order.id !== id));
      alert("Pedido eliminado permanentemente");
    } catch (err) {
      console.error("Error deleting order permanently:", err);
      alert("Error al eliminar el pedido permanentemente");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700" },
      "en-transito": { label: "En Tránsito", className: "bg-cyan-100 text-cyan-700" },
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700" },
    };
    const variant = variants[status as keyof typeof variants] || variants.pendiente;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando pedidos archivados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Pedidos Archivados</h2>
        <Button
          variant="outline"
          onClick={() => navigate("/portal/orders")}
          className="bg-gray-600 text-white hover:bg-gray-700"
        >
          Volver a Pedidos Activos
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Número Cliente</TableHead>
              <TableHead>Número Factura</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Pedido</TableHead>
              <TableHead>Monto Total</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Fecha Archivado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {archivedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No hay pedidos archivados
                </TableCell>
              </TableRow>
            ) : (
              archivedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer_number}</TableCell>
                  <TableCell>{order.invoice_number}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{formatDate(order.order_date)}</TableCell>
                  <TableCell>{Number(order.total_amount || 0).toFixed(2)}</TableCell>
                  <TableCell>{order.user?.name || "N/A"}</TableCell>
                  <TableCell>{formatDate(order.deleted_at || undefined)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleRestore(order.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restaurar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handlePermanentDelete(order.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
