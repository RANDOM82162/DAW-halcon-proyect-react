import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";

export function InventoryForm() {
  const navigate = useNavigate();
  const { inventoryId } = useParams();
  const isEdit = !!inventoryId;

  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    location: "",
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({
        product: "test1",
        quantity: "2",
        location: "a",
      });
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEdit ? "Inventario actualizado exitosamente" : "Inventario creado exitosamente");
    navigate("/portal/inventory");
  };

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
              required
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
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
            {isEdit ? "Actualizar Registro" : "Guardar Registro"}
          </Button>
        </div>
      </form>
    </div>
  );
}
