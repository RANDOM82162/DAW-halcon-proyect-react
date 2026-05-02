import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Package, Building2, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function PublicSearchPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const mockOrders = [
    {
      id: "PED-2026-001",
      date: "2026-04-15",
      status: "entregado",
      items: 12,
    },
    {
      id: "PED-2026-045",
      date: "2026-04-20",
      status: "en-proceso",
      items: 8,
    },
    {
      id: "PED-2026-089",
      date: "2026-04-25",
      status: "pendiente",
      items: 15,
    },
    {
      id: "PED-2026-033",
      date: "2026-04-18",
      status: "en-transito",
      items: 10,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    if (searchTerm.trim()) {
      const results = mockOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.date.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const getStatusInfo = (status: string) => {
    const variants = {
      entregado: {
        label: "Entregado",
        className: "bg-green-100 text-green-700",
        description: "Su pedido ha sido entregado exitosamente",
      },
      "en-transito": {
        label: "En Tránsito",
        className: "bg-cyan-100 text-cyan-700",
        description: "Su pedido está en camino al sitio de obra",
      },
      "en-proceso": {
        label: "En Proceso",
        className: "bg-blue-100 text-blue-700",
        description: "Su pedido está siendo preparado",
      },
      pendiente: {
        label: "Pendiente",
        className: "bg-yellow-100 text-yellow-700",
        description: "Su pedido ha sido recibido y está en cola",
      },
      cancelado: {
        label: "Cancelado",
        className: "bg-red-100 text-red-700",
        description: "Este pedido ha sido cancelado",
      },
    };
    return variants[status as keyof typeof variants];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Constructora Halcon</h1>
                <p className="text-gray-600 text-sm">Seguimiento de Pedidos</p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-3">Buscar Estado de Pedido</h2>
          <p className="text-gray-600">
            Ingrese su número de pedido para verificar el estado actual
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ej: PED-2026-001"
              />
            </div>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              Buscar
            </Button>
          </form>
        </div>

        {hasSearched && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {searchResults.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No se encontró el pedido</h3>
                <p className="text-gray-600 mb-6">
                  Verifique que el número de pedido sea correcto
                </p>
                <p className="text-gray-500 text-sm">
                  ¿Necesita ayuda?{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Contacte a soporte
                  </a>
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {searchResults.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <div key={order.id} className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-100 p-4 rounded-lg">
                            <Package className="w-8 h-8 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-gray-900 mb-1">{order.id}</h3>
                            <p className="text-gray-600">
                              Fecha de pedido: {order.date}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-700">Estado Actual:</span>
                          <Badge className={`${statusInfo.className} px-4 py-2`}>
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{statusInfo.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-600 mb-1">Total de Artículos</p>
                          <p className="text-gray-900 text-xl">{order.items}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-600 mb-1">Fecha de Pedido</p>
                          <p className="text-gray-900 text-xl">
                            {order.date.split("-")[2]}/{order.date.split("-")[1]}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-900 text-sm">
                          <strong>Nota:</strong> Para ver más detalles de su pedido,{" "}
                          <button
                            onClick={() => navigate(`/order/${order.id}`)}
                            className="text-purple-600 hover:text-purple-700 underline"
                          >
                            ver detalles completos
                          </button>
                          .
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <h3 className="text-gray-900 mb-4 text-center">
              ¿Cómo funciona el seguimiento?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-700">1</span>
                </div>
                <p className="text-gray-700 mb-1">Pendiente</p>
                <p className="text-gray-500 text-sm">Pedido recibido</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-700">2</span>
                </div>
                <p className="text-gray-700 mb-1">En Proceso</p>
                <p className="text-gray-500 text-sm">Preparando materiales</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-cyan-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-cyan-700">3</span>
                </div>
                <p className="text-gray-700 mb-1">En Tránsito</p>
                <p className="text-gray-500 text-sm">Enviado a obra</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-700">4</span>
                </div>
                <p className="text-gray-700 mb-1">Entregado</p>
                <p className="text-gray-500 text-sm">Pedido completado</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 Constructora Halcon. Todos los derechos reservados.</p>
          <p className="mt-2">
            ¿Necesita ayuda?{" "}
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Contacte a soporte
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
