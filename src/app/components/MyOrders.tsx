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

export function MyOrders() {
  const orders = [
    {
      id: "PED-2026-089",
      date: "2026-04-25",
      deliveryDate: "2026-04-30",
      site: "Obra Av. Reforma 456",
      status: "pendiente",
      items: 15,
      total: "$22,100",
    },
    {
      id: "PED-2026-045",
      date: "2026-04-20",
      deliveryDate: "2026-04-23",
      site: "Construcción Valle Norte",
      status: "en-proceso",
      items: 8,
      total: "$8,500",
    },
    {
      id: "PED-2026-033",
      date: "2026-04-18",
      deliveryDate: "2026-04-21",
      site: "Desarrollo Residencial Sur",
      status: "en-transito",
      items: 10,
      total: "$12,300",
    },
    {
      id: "PED-2026-001",
      date: "2026-04-15",
      deliveryDate: "2026-04-17",
      site: "Obra Av. Reforma 456",
      status: "entregado",
      items: 12,
      total: "$15,250",
    },
    {
      id: "PED-2026-012",
      date: "2026-04-10",
      deliveryDate: "2026-04-13",
      site: "Torre Ejecutiva Centro",
      status: "entregado",
      items: 20,
      total: "$28,900",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700" },
      "en-transito": { label: "En Tránsito", className: "bg-cyan-100 text-cyan-700" },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700" },
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
      cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-purple-600">
                  {order.id}
                </TableCell>
                <TableCell className="text-gray-600">{order.date}</TableCell>
                <TableCell className="text-gray-600">{order.deliveryDate}</TableCell>
                <TableCell>{order.site}</TableCell>
                <TableCell className="text-center">{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
          <p className="text-2xl text-gray-900">
            {orders.filter((o) => o.status === "pendiente").length}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-gray-900">En Proceso</h4>
          </div>
          <p className="text-2xl text-gray-900">
            {orders.filter((o) => o.status === "en-proceso").length}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
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
