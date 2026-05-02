import { useState } from "react";
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

export function ArchivedOrders() {
  const navigate = useNavigate();
  const [archivedOrders, setArchivedOrders] = useState([
    {
      id: 41,
      clientNumber: "1",
      invoiceNumber: "123",
      status: "ordered",
      orderDate: "01/04/2026",
      totalAmount: "$0.01",
      user: "admin",
      deletedDate: "22/04/2026 07:18",
    },
  ]);

  const handleRestore = (id: number) => {
    if (confirm("¿Desea restaurar este pedido?")) {
      setArchivedOrders(archivedOrders.filter((order) => order.id !== id));
      alert("Pedido restaurado exitosamente");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ordered: { label: "Ordered", className: "bg-blue-100 text-blue-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

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
              <TableHead>Fecha Eliminación</TableHead>
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
                  <TableCell>{order.clientNumber}</TableCell>
                  <TableCell>{order.invoiceNumber}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>{order.deletedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="bg-green-500 text-white hover:bg-green-600"
                      onClick={() => handleRestore(order.id)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restaurar
                    </Button>
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
