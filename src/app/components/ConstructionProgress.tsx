import { useState, useEffect } from "react";
import { Eye, Camera } from "lucide-react";
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

interface ProgressItem {
  date: string;
  phase: string;
  progress: number;
  notes: string;
  status: string;
}

export function ConstructionProgress() {
  const [progressData, setProgressData] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConstructionProgress();
  }, []);

  const fetchConstructionProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement API call to fetch construction progress
      // const response = await getConstructionProgress();
      // setProgressData(response.data || []);

      // For now, set empty array to indicate no data
      setProgressData([]);
    } catch (err) {
      console.error("Error fetching construction progress:", err);
      setError("Error al cargar el progreso de construcción");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { label: "Completado", className: "bg-green-100 text-green-700" },
      "in-progress": { label: "En Progreso", className: "bg-blue-100 text-blue-700" },
      pending: { label: "Pendiente", className: "bg-gray-100 text-gray-700" },
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
        <div className="text-gray-600">Cargando progreso de construcción...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchConstructionProgress}
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
        <h2 className="text-gray-900 mb-1">Progreso de Construcción</h2>
        <p className="text-gray-600">Seguimiento del estado de cada fase de construcción</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Fase</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progressData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No hay datos de progreso de construcción disponibles
                </TableCell>
              </TableRow>
            ) : (
              progressData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-600">{formatDate(item.date)}</TableCell>
                  <TableCell>{item.phase}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-gray-700 min-w-[45px]">{item.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{item.notes}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4" />
                    </Button>
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
