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

export function OrderForm() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const isEdit = !!orderId;

  const [formData, setFormData] = useState({
    clientNumber: "",
    invoiceNumber: "",
    status: "",
    orderDate: "",
    deliveryDate: "",
    totalAmount: "",
    notes: "",
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({
        clientNumber: "1",
        invoiceNumber: "1234",
        status: "ordered",
        orderDate: "2026-04-01",
        deliveryDate: "2026-04-10",
        totalAmount: "0.01",
        notes: "Pedido de prueba",
      });
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEdit ? "Pedido actualizado exitosamente" : "Pedido creado exitosamente");
    navigate("/portal/orders");
  };

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
                <SelectItem value="ordered">Ordered</SelectItem>
                <SelectItem value="in-process">En Proceso</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
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
              required
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
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
            {isEdit ? "Actualizar Pedido" : "Guardar Pedido"}
          </Button>
        </div>
      </form>
    </div>
  );
}
