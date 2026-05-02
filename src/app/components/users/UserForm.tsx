import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function UserForm() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEdit = !!userId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: "admin",
        email: "admin@admin.com",
        role: "Admin",
        department: "Sin asignar",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEdit && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    alert(isEdit ? "Usuario actualizado exitosamente" : "Usuario creado exitosamente");
    navigate("/portal/users");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-gray-900">{isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block text-gray-700 mb-2">
                Rol
              </label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Administrador</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Empleado">Empleado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="department" className="block text-gray-700 mb-2">
                Departamento
              </label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sin asignar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                  <SelectItem value="Operaciones">Operaciones</SelectItem>
                  <SelectItem value="Ventas">Ventas</SelectItem>
                  <SelectItem value="Logística">Logística</SelectItem>
                  <SelectItem value="Administración">Administración</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isEdit && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/portal/users")}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
            {isEdit ? "Actualizar Usuario" : "Guardar Usuario"}
          </Button>
        </div>
      </form>
    </div>
  );
}
