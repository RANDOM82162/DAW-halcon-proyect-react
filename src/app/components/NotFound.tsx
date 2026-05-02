import { useNavigate } from "react-router";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-gray-900 mb-2">Página No Encontrada</h1>
        <p className="text-gray-600 mb-8">
          La página que está buscando no existe o ha sido movida.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Ir a Inicio
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
