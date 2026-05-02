import { useState } from "react";
import { Search, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function SearchOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const mockOrders = [
    {
      id: "PED-2026-001",
      date: "2026-04-15",
      status: "entregado",
      total: "$15,250",
      items: 12,
    },
    {
      id: "PED-2026-045",
      date: "2026-04-20",
      status: "en-proceso",
      total: "$8,500",
      items: 8,
    },
    {
      id: "PED-2026-089",
      date: "2026-04-25",
      status: "pendiente",
      total: "$22,100",
      items: 15,
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
      setSearchResults(mockOrders);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      entregado: { label: "Entregado", className: "bg-green-100 text-green-700" },
      "en-proceso": { label: "En Proceso", className: "bg-blue-100 text-blue-700" },
      pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
      cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Buscar Pedidos</h2>
        <p className="text-gray-600">Ingrese el número de pedido o fecha para buscar</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Ej: PED-2026-001 o 2026-04-15"
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {searchResults.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No se encontraron pedidos</h3>
              <p className="text-gray-600">
                Intente con otro número de pedido o fecha
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {searchResults.map((order) => (
                <div
                  key={order.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Package className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-gray-900">{order.id}</h4>
                        <p className="text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm ml-14">
                    <div>
                      <span className="text-gray-600">Artículos: </span>
                      <span className="text-gray-900">{order.items}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total: </span>
                      <span className="text-gray-900">{order.total}</span>
                    </div>
                  </div>
                  <div className="mt-4 ml-14">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
