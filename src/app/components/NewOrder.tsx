import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface OrderItem {
  id: number;
  material: string;
  quantity: string;
  unit: string;
}

export function NewOrder() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, material: "", quantity: "", unit: "" },
  ]);

  const materials = [
    "Cemento Portland",
    "Arena",
    "Grava",
    "Varilla 3/8",
    "Varilla 1/2",
    "Alambrón",
    "Block de Concreto",
    "Ladrillo Rojo",
    "Cal",
    "Yeso",
    "Tablaroca",
    "Madera",
  ];

  const units = ["Ton", "m³", "Pza", "Bolsa", "Kg", "m"];

  const addItem = () => {
    setItems([...items, { id: Date.now(), material: "", quantity: "", unit: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pedido enviado exitosamente");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Nuevo Pedido de Materiales</h2>
        <p className="text-gray-600">Complete el formulario para solicitar materiales</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Información del Pedido</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="delivery-date" className="block text-gray-700 mb-2">
                Fecha de Entrega Deseada
              </label>
              <input
                type="date"
                id="delivery-date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="site" className="block text-gray-700 mb-2">
                Sitio de Obra
              </label>
              <input
                type="text"
                id="site"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Dirección del sitio de entrega"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Materiales</h3>
            <Button
              type="button"
              onClick={addItem}
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Material
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-5">
                  <label className="block text-gray-700 mb-2">Material</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((mat) => (
                        <SelectItem key={mat} value={mat}>
                          {mat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <label className="block text-gray-700 mb-2">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-gray-700 mb-2">Unidad</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Observaciones</h3>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
            placeholder="Instrucciones especiales, horarios de entrega, etc..."
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            Enviar Pedido
          </Button>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
