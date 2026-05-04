import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Upload, Image as ImageIcon, FileImage, X } from "lucide-react";
import { Button } from "../ui/button";
import { getOrderById } from "@/api";
import { uploadOrderDeliveryPhoto } from "@/api/orders";

export function OrderDeliveryPhoto() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOrderById(Number(id));
      setOrder(response.data || response);
    } catch (err) {
      console.error("Error fetching order delivery photo:", err);
      setError("No se pudo cargar la información del pedido");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen es demasiado grande. El tamaño máximo permitido es de 2MB.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !orderId) return;

    try {
      setUploading(true);
      setError(null);
      
      const response = await uploadOrderDeliveryPhoto(Number(orderId), selectedFile);
      
      setOrder({
        ...order,
        delivery_photo: response.delivery_photo
      });
      
      alert("Foto subida exitosamente");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Error uploading photo:", err);
      const backendError = err.response?.data?.message || err.response?.data?.error;
      const validationErrors = err.response?.data?.errors?.photo?.[0];
      setError(validationErrors || backendError || "Error general al conectarse con el servidor para la subida. Verifica tu conexión.");
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError(null);
  };

  const getPhotoContent = () => {
    const photo = order?.delivery_photo;
    
    let imageUrl = null;
    if (photo) {
      if (photo.startsWith('http')) {
        imageUrl = photo;
      } else if (photo.startsWith('/storage/')) {
        imageUrl = `http://localhost:8000${photo}`;
      } else {
        imageUrl = photo;
      }
    }

    if (!photo) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-6">No hay foto de entrega disponible para este pedido.</p>
          
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/jpg, image/webp, image/gif, image/svg+xml" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileSelection}
          />
          
          {!selectedFile ? (
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Seleccionar Foto de Entrega
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full max-w-sm">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <FileImage className="w-5 h-5 text-purple-600" />
                <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                <button onClick={clearSelection} className="text-gray-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Button 
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {uploading ? "Subiendo..." : "Confirmar Subida"}
              </Button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <img
          src={imageUrl}
          alt={`Foto de entrega del pedido ${order.id}`}
          className="w-full max-w-xl rounded-lg shadow-sm border border-gray-200 object-contain max-h-[600px] bg-gray-50 mx-auto block"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = photo;
          }}
        />
        
        <div className="flex flex-col items-center justify-center pt-4">
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/jpg, image/webp, image/gif, image/svg+xml" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileSelection}
          />
          
          {!selectedFile ? (
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Reemplazar Foto
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 w-full max-w-sm">
              <div className="flex items-center justify-between w-full text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-purple-600" />
                  <span className="truncate max-w-[200px] font-medium">{selectedFile.name}</span>
                </div>
                <button onClick={clearSelection} className="text-gray-400 hover:text-red-500 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Button 
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {uploading ? "Subiendo reemplazo..." : "Confirmar Reemplazo"}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando foto de entrega...</div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700">{error}</p>
        <Button onClick={() => navigate("/portal/orders")} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
          Volver a pedidos
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Foto de Entrega del Pedido #{order?.invoice_number || order?.id}</h2>
          <p className="text-gray-600">Visualiza o actualiza la foto registrada para la entrega del pedido.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/portal/orders")}
          className="bg-gray-600 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {error && order && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 flex items-start">
            <span className="block font-medium">Error:&nbsp;</span>
            <span className="block">{error}</span>
          </div>
        )}
        {getPhotoContent()}
      </div>
    </div>
  );
}
