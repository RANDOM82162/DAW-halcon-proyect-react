import { useState, useEffect } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface Document {
  name: string;
  type: string;
  size: string;
  date: string;
  icon: any;
}

export function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement API call to fetch documents
      // const response = await getDocuments();
      // setDocuments(response.data || []);

      // For now, set empty array to indicate no data
      setDocuments([]);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Error al cargar los documentos");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando documentos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button
          onClick={fetchDocuments}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Documentos</h2>
        <p className="text-gray-600">Accede a todos los documentos y archivos relacionados con el proyecto</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg border border-gray-200 p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay documentos disponibles</p>
          </div>
        ) : (
          documents.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 mb-1 truncate">{doc.name}</h4>
                    <p className="text-gray-500 mb-3">
                      {doc.type} • {doc.size}
                    </p>
                    <p className="text-gray-400 mb-4">{formatDate(doc.date)}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
