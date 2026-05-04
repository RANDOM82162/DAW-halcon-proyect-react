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
import { createUser, getUserById, updateUser } from "@/api";

const roleOptions = [
  { value: "admin", label: "Administrador" },
  { value: "manager", label: "Gerente" },
  { value: "employee", label: "Empleado" },
];

const departmentOptions = [
  { value: "none", label: "Sin asignar" },
  { value: "sales", label: "Ventas" },
  { value: "purchasing", label: "Compras" },
  { value: "warehouse", label: "Almacén" },
  { value: "route", label: "Ruta" },
];

export function UserForm() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEdit = !!userId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    department: "none",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && userId) {
      fetchUser(userId);
    }
  }, [isEdit, userId]);

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserById(Number(id));
      const user = response.data || response;
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "admin",
        department: user.department || "none",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Error al cargar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (!isEdit && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department === "none" ? null : formData.department,
      };

      if (!isEdit || formData.password) {
        payload.password = formData.password;
      }

      if (isEdit && userId) {
        await updateUser(Number(userId), payload);
        alert("Usuario actualizado exitosamente");
      } else {
        await createUser(payload);
        alert("Usuario creado exitosamente");
      }

      navigate("/portal/users");
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Error al guardar el usuario. Revisa los datos e inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando usuario...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

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
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="department" className="block text-gray-700 mb-2">
                Departamento
              </label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={saving}>
            {saving ? "Guardando..." : isEdit ? "Actualizar Usuario" : "Guardar Usuario"}
          </Button>
        </div>
      </form>
    </div>
  );
}
