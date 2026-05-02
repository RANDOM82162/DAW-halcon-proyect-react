import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Package, MapPin, Calendar, Truck, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function OrderDetailsPublic() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const mockOrderDetails = {
    id: orderId || "PED-2026-001",
    date: "2026-04-15",
    deliveryDate: "2026-04-17",
    status: "entregado",
    site: "Obra Av. Reforma 456, Col. Centro",
    items: [
      { material: "Cemento Portland", quantity: 50, unit: "Bolsa", price: "$250" },
      { material: "Arena", quantity: 5, unit: "m³", price: "$500" },
      { material: "Grava", quantity: 3, unit: "m³", price: "$450" },
      { material: "Varilla 3/8", quantity: 100, unit: "Pza", price: "$1,200" },
    ],
    total: "$15,250",
    tracking: [
      { status: "Pedido recibido", date: "2026-04-15 09:30", completed: true },
      { status: "En preparación", date: "2026-04-15 14:20", completed: true },
      { status: "En tránsito", date: "2026-04-16 08:00", completed: true },
      { status: "Entregado", date: "2026-04-17 11:45", completed: true },
    ],
  };

  const getStatusInfo = (status: string) => {
    const variants = {
      entregado: {
        label: "Entregado",
        className: "bg-green-100 text-green-700",
        icon: CheckCircle,
      },
      "en-transito": {
        label: "En Tránsito",
        className: "bg-cyan-100 text-cyan-700",
        icon: Truck,
      },
      "en-proceso": {
        label: "En Proceso",
        className: "bg-blue-100 text-blue-700",
        icon: Package,
      },
      pendiente: {
        label: "Pendiente",
        className: "bg-yellow-100 text-yellow-700",
        icon: Calendar,
      },
    };
    return variants[status as keyof typeof variants];
  };

  const statusInfo = getStatusInfo(mockOrderDetails.status);
  const StatusIcon = statusInfo.icon;

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
              <p className="text-gray-600">{mockOrderDetails.id}</p>
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
                  <p className="text-gray-900">{mockOrderDetails.date}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Fecha de Entrega</p>
                  <p className="text-gray-900">{mockOrderDetails.deliveryDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 text-sm mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Sitio de Obra
                  </p>
                  <p className="text-gray-900">{mockOrderDetails.site}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900">Materiales Solicitados</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {mockOrderDetails.items.map((item, index) => (
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
                  <p className="text-gray-900">Total</p>
                  <p className="text-gray-900 text-xl">{mockOrderDetails.total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Seguimiento</h3>
              <div className="space-y-4">
                {mockOrderDetails.tracking.map((track, index) => (
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
                      {index < mockOrderDetails.tracking.length - 1 && (
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

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
