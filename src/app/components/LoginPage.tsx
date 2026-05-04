import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, Lock, Mail, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { login } from "../../api/auth";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(email, password);
      onLogin(email);
      navigate("/portal");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Verifique sus credenciales.");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white mb-4 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a búsqueda
        </button>
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-purple-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-white mb-2">Constructora Halcon</h1>
            <p className="text-purple-100">Portal de Pedidos de Materiales</p>
          </div>

          <div className="p-8">
            <h2 className="text-gray-900 mb-2 text-center">Iniciar Sesión</h2>
            <p className="text-gray-600 text-center mb-6">
              Ingrese sus credenciales para continuar
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="usuario@ejemplo.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mr-2"
                    disabled={isLoading}
                  />
                  Recordarme
                </label>
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tiene una cuenta?{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Contacte con soporte
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>© 2026 Constructora Halcon. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
