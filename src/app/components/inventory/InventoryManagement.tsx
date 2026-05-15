import { useState, useEffect } from "react";
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
import { getInventory, deleteInventoryItem } from "@/api";
import { getUserData } from "@/api/auth";

interface InventoryItem {
  id: number;
  product_name: string;
  quantity: number;
  location: string;
  created_at?: string;
  updated_at?: string;
}

export function InventoryManagement() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userData = getUserData();
  const userRole = userData?.role || "employee";

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getInventory();
      setInventory(response.data || []);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Error al cargar el inventario");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este registro de inventario?")) {
      return;
    }

    try {
      await deleteInventoryItem(id);
      setInventory(inventory.filter((item) => item.id !== id));
      alert("Item de inventario eliminado exitosamente");
      navigate("/portal/inventory");
    } catch (err) {
      console.error("Error deleting inventory item:", err);
      alert("Error al eliminar el item de inventario");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando inventario...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchInventory}
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
        <h2 className="text-gray-900">Gestión de Inventario</h2>
        {(userRole === "admin" || userRole === "manager") && (
          <Button
            onClick={() => navigate("/portal/inventory/new")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Nuevo Inventario
          </Button>
        )}
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
            {inventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No hay items en el inventario
                </TableCell>
              </TableRow>
            ) : (
              inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.location || "Sin ubicación"}</TableCell>
                  <TableCell>
                    {item.created_at ? formatDate(item.created_at) : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-500 text-white hover:bg-gray-600"
                        onClick={() => navigate(`/portal/inventory/view/${item.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {(userRole === "admin" || userRole === "manager") && (
                        <Button
                          size="sm"
                          className="bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => navigate(`/portal/inventory/edit/${item.id}`)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {userRole === "admin" && (
                        <Button
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleDelete(item.id)}
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
    </div>
  );
}
