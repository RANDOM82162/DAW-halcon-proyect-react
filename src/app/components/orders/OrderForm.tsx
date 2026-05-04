import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createOrder, getOrderById, updateOrder } from "@/api";

const statusOptions = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en-proceso", label: "En Proceso" },
  { value: "en-transito", label: "En Tránsito" },
  { value: "entregado", label: "Entregado" },
];

export function OrderForm() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const isEdit = !!orderId;

  const [formData, setFormData] = useState({
    clientNumber: "",
    invoiceNumber: "",
    status: "pendiente",
    orderDate: "",
    deliveryDate: "",
    totalAmount: "",
    notes: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && orderId) {
      fetchOrder(orderId);
    }
  }, [isEdit, orderId]);

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrderById(Number(id));
      const order = response.data || response;
      setFormData({
        clientNumber: order.customer_number || "",
        invoiceNumber: order.invoice_number || "",
        status: order.status || "pendiente",
        orderDate: order.order_date ? order.order_date.slice(0, 10) : "",
        deliveryDate: order.delivery_date ? order.delivery_date.slice(0, 10) : "",
        totalAmount: order.total_amount?.toString() || "",
        notes: order.notes || "",
      });
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Error al cargar el pedido");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientNumber || !formData.invoiceNumber || !formData.orderDate || !formData.totalAmount) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload = {
        customer_number: formData.clientNumber,
        invoice_number: formData.invoiceNumber,
        status: formData.status,
        order_date: formData.orderDate,
        delivery_date: formData.deliveryDate || null,
        total_amount: parseFloat(formData.totalAmount),
        notes: formData.notes || null,
      };

      if (isEdit && orderId) {
        await updateOrder(Number(orderId), payload);
        alert("Pedido actualizado exitosamente");
      } else {
        await createOrder(payload);
        alert("Pedido creado exitosamente");
      }

      navigate("/portal/orders");
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Error al guardar el pedido. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando pedido...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-gray-900">{isEdit ? "Editar Pedido" : "Crear Nuevo Pedido"}</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="clientNumber" className="block text-gray-700 mb-2">
              Número de Cliente
            </label>
            <input
              type="text"
              id="clientNumber"
              value={formData.clientNumber}
              onChange={(e) => setFormData({ ...formData, clientNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="invoiceNumber" className="block text-gray-700 mb-2">
              Número de Factura
            </label>
            <input
              type="text"
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Estado
            </label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="orderDate" className="block text-gray-700 mb-2">
              Fecha de Pedido
            </label>
            <input
              type="date"
              id="orderDate"
              value={formData.orderDate}
              onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="deliveryDate" className="block text-gray-700 mb-2">
              Fecha de Entrega
            </label>
            <input
              type="date"
              id="deliveryDate"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="totalAmount" className="block text-gray-700 mb-2">
              Monto Total
            </label>
            <input
              type="number"
              step="0.01"
              id="totalAmount"
              value={formData.totalAmount}
              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-gray-700 mb-2">
              Notas
            </label>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/portal/orders")}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={saving}>
            {saving ? "Guardando..." : isEdit ? "Actualizar Pedido" : "Guardar Pedido"}
          </Button>
        </div>
      </form>
    </div>
  );
}
