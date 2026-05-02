import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function InventoryManagement() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([
    {
      id: 3,
      product: "test1",
      quantity: 2,
      location: "a",
      creationDate: "22/04/2026",
    },
    {
      id: 4,
      product: "Cemento Portland",
      quantity: 150,
      location: "Almacén A, Estante 3",
      creationDate: "20/04/2026",
    },
    {
      id: 5,
      product: "Varilla 3/8",
      quantity: 500,
      location: "Patio Exterior, Zona B",
      creationDate: "18/04/2026",
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este registro de inventario?")) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Gestión de Inventario</h2>
        <Button
          onClick={() => navigate("/portal/inventory/new")}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Nuevo Inventario
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.creationDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="bg-gray-500 text-white hover:bg-gray-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => navigate(`/portal/inventory/edit/${item.id}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
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
