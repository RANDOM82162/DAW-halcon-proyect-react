import { useState } from "react";
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

export function OrdersManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    {
      id: 42,
      clientNumber: "1",
      invoiceNumber: "1234",
      status: "ordered",
      orderDate: "01/04/2026",
      totalAmount: "$0.01",
      user: "admin",
    },
    {
      id: 43,
      clientNumber: "2",
      invoiceNumber: "1235",
      status: "in-process",
      orderDate: "05/04/2026",
      totalAmount: "$15,250",
      user: "admin",
    },
    {
      id: 44,
      clientNumber: "3",
      invoiceNumber: "1236",
      status: "delivered",
      orderDate: "10/04/2026",
      totalAmount: "$8,500",
      user: "gerente",
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este pedido?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ordered: { label: "Ordered", className: "bg-blue-100 text-blue-700" },
      "in-process": { label: "En Proceso", className: "bg-yellow-100 text-yellow-700" },
      delivered: { label: "Entregado", className: "bg-green-100 text-green-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

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
              <TableHead>Número Cliente</TableHead>
              <TableHead>Número Factura</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Pedido</TableHead>
              <TableHead>Monto Total</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.clientNumber}</TableCell>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="bg-gray-500 text-white hover:bg-gray-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">
                      <Camera className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => navigate(`/portal/orders/edit/${order.id}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
