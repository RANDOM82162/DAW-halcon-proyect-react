import { useState, useEffect } from "react";
import { Eye, Upload } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Payment {
  concept: string;
  dueDate: string;
  amount: string;
  status: string;
}

export function Payments() {
  const [paymentsData, setPaymentsData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement API call to fetch payments
      // const response = await getPayments();
      // setPaymentsData(response.data || []);

      // For now, set empty array to indicate no data
      setPaymentsData([]);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Error al cargar los pagos");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { label: "Pagado", className: "bg-green-100 text-green-700" },
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
      overdue: { label: "Vencido", className: "bg-red-100 text-red-700" },
    };
    const variant = variants[status as keyof typeof variants] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando pagos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchPayments}
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
        <h2 className="text-gray-900 mb-1">Pagos</h2>
        <p className="text-gray-600">Revisa los cronogramas de pago y administra los recibos</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No hay pagos disponibles
                </TableCell>
              </TableRow>
            ) : (
              paymentsData.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.concept}</TableCell>
                  <TableCell className="text-gray-600">{formatDate(payment.dueDate)}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      {payment.status === "paid" ? (
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Recibo
                        </Button>
                      ) : (
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Subir Recibo
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
