import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";
import { createInventoryItem, getInventoryById, updateInventoryItem } from "@/api";

export function InventoryForm() {
  const navigate = useNavigate();
  const { inventoryId } = useParams();
  const isEdit = !!inventoryId;

  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    location: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && inventoryId) {
      fetchInventoryItem(inventoryId);
    }
  }, [isEdit, inventoryId]);

  const fetchInventoryItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getInventoryById(Number(id));
      const item = response.data || response;
      setFormData({
        product: item.product_name || "",
        quantity: item.quantity?.toString() || "",
        location: item.location || "",
      });
    } catch (err) {
      console.error("Error fetching inventory item:", err);
      setError("Error al cargar el inventario");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product || !formData.quantity) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload = {
        product_name: formData.product,
        quantity: Number(formData.quantity),
        location: formData.location || null,
      };

      if (isEdit && inventoryId) {
        await updateInventoryItem(Number(inventoryId), payload);
        alert("Inventario actualizado exitosamente");
      } else {
        await createInventoryItem(payload);
        alert("Inventario creado exitosamente");
      }

      navigate("/portal/inventory");
    } catch (err) {
      console.error("Error saving inventory item:", err);
      alert("Error al guardar el inventario. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando registro de inventario...</div>
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
      <h2 className="text-gray-900">
        {isEdit ? "Editar Registro de Inventario" : "Crear Nuevo Registro de Inventario"}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="product" className="block text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="product"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Ej: Almacén A, Estante 3"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/portal/inventory")}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={saving}>
            {saving ? "Guardando..." : isEdit ? "Actualizar Registro" : "Guardar Registro"}
          </Button>
        </div>
      </form>
    </div>
  );
}
