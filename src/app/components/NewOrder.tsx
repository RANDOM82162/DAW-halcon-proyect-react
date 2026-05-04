import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getProducts, createOrder } from "@/api";

interface OrderItem {
  id: number;
  product_id: number;
  material: string;
  quantity: string;
  unit: string;
}

interface Product {
  id: number;
  name: string;
  unit: string;
}

export function NewOrder() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, product_id: 0, material: "", quantity: "", unit: "" },
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), product_id: 0, material: "", quantity: "", unit: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'material') {
          const selectedProduct = products.find(p => p.name === value);
          return {
            ...item,
            material: value,
            product_id: selectedProduct?.id || 0,
            unit: selectedProduct?.unit || item.unit
          };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const deliveryDate = formData.get('delivery-date') as string;
    const site = formData.get('site') as string;
    const notes = formData.get('notes') as string;

    // Validate items
    const validItems = items.filter(item =>
      item.material && item.quantity && item.unit && item.product_id > 0
    );

    if (validItems.length === 0) {
      alert("Debe agregar al menos un material válido");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const orderData = {
        delivery_date: deliveryDate,
        site_address: site,
        notes: notes,
        items: validItems.map(item => ({
          product_id: item.product_id,
          quantity: parseFloat(item.quantity),
          unit: item.unit
        }))
      };

      await createOrder(orderData);
      alert("Pedido enviado exitosamente");

      // Reset form
      setItems([{ id: 1, product_id: 0, material: "", quantity: "", unit: "" }]);
      (e.target as HTMLFormElement).reset();

    } catch (err) {
      console.error("Error creating order:", err);
      alert("Error al enviar el pedido. Por favor, inténtelo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchProducts}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white"
        >
          Reintentar
        </Button>
      </div>
    );
  }

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
                  <Select
                    value={item.material}
                    onValueChange={(value) => updateItem(item.id, 'material', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione material" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name}
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
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-gray-700 mb-2">Unidad</label>
                  <input
                    type="text"
                    value={item.unit}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    placeholder="Se auto-completa"
                  />
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
            name="notes"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
            placeholder="Instrucciones especiales, horarios de entrega, etc..."
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Enviar Pedido"}
          </Button>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
