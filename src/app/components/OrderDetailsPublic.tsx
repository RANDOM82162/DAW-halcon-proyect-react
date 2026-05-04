import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Package, MapPin, Calendar, Truck, CheckCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { getPublicOrder } from "@/api/orders";

export function OrderDetailsPublic() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicOrder(id);
      setOrder(data);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("No se pudo encontrar la información del pedido. Verifique que el número sea correcto.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    const variants = {
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700", icon: CheckCircle },
      "en-transito": { label: "En Tránsito", className: "bg-cyan-100 text-cyan-700", icon: Truck },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700", icon: Package },
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700", icon: Calendar },
    };
    return variants[status as keyof typeof variants] || variants.pendiente;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Buscando información del pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <Package className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-gray-900 mb-2">Pedido no encontrado</h2>
        <p className="text-gray-600 mb-6">{error || "No se encontró el pedido."}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Volver a buscar
        </button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  // Since we don't have items or tracking in the database, we use mock placeholders 
  // but with the real order metadata
  const mockItems = [
    { material: "Materiales Generales", quantity: 1, unit: "Lote", price: "$" + (order.total_amount || "0.00") }
  ];

  const mockTracking = [
    { status: "Pedido recibido", date: order.created_at ? new Date(order.created_at).toLocaleDateString() : order.order_date, completed: true },
    { status: "En preparación", date: "-", completed: ["in_process", "in_route", "delivered", "en-proceso", "en-transito", "entregado"].includes(order.status) },
    { status: "En tránsito", date: "-", completed: ["in_route", "delivered", "en-transito", "entregado"].includes(order.status) },
    { status: "Entregado", date: order.delivery_date || "-", completed: ["delivered", "entregado"].includes(order.status) },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "No definida";
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a búsqueda
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Detalles del Pedido</h1>
              <p className="text-gray-600">{order.invoice_number || order.id}</p>
            </div>
            <Badge className={`${statusInfo.className} px-4 py-2`}>
              <StatusIcon className="w-4 h-4 mr-2" />
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Información del Pedido</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Fecha de Pedido</p>
                  <p className="text-gray-900">{formatDate(order.order_date)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Fecha de Entrega</p>
                  <p className="text-gray-900">{formatDate(order.delivery_date)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 text-sm mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Cliente / Referencia
                  </p>
                  <p className="text-gray-900">{order.customer_number || "No especificado"}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900">Resumen de Materiales</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockItems.map((item, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900">{item.material}</p>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <p className="text-gray-900">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-gray-900">Total Estimado</p>
                  <p className="text-gray-900 text-xl">${Number(order.total_amount || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking and Photo */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Seguimiento</h3>
              <div className="space-y-4">
                {mockTracking.map((track, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          track.completed
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {track.completed && (
                          <CheckCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      {index < mockTracking.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            track.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`${track.completed ? "text-gray-900" : "text-gray-500"}`}>
                        {track.status}
                      </p>
                      <p className="text-gray-500 text-sm">{track.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.delivery_photo && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Foto de Entrega</h3>
                <img
                  src={order.delivery_photo.startsWith('/storage/') ? `http://localhost:8000${order.delivery_photo}` : order.delivery_photo}
                  alt={`Foto de entrega del pedido ${order.invoice_number || order.id}`}
                  className="w-full rounded-lg shadow-sm border border-gray-200 object-contain max-h-[300px] bg-gray-50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = order.delivery_photo;
                  }}
                />
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-sm">
                Para ver más información detallada,{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  inicie sesión
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
