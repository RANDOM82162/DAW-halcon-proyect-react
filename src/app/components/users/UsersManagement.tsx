import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { deleteUser, getUsers } from "@/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string | null;
  deleted_at?: string | null;
  created_at?: string;
}

export function UsersManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers();
      const result = response.data || response;
      const usersList = Array.isArray(result) ? result : result.data || [];
      setUsers(usersList);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este usuario?")) {
      return;
    }

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      alert("Usuario eliminado exitosamente");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error al eliminar el usuario");
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: { className: "bg-red-500 text-white", label: "Administrador" },
      manager: { className: "bg-blue-500 text-white", label: "Gerente" },
      employee: { className: "bg-gray-500 text-white", label: "Empleado" },
    };
    const variant = variants[role as keyof typeof variants] || variants.employee;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getStatusBadge = (deletedAt: string | null | undefined) => {
    return <Badge className="bg-green-500 text-white">{deletedAt ? "Archivado" : "Activo"}</Badge>;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Cargando usuarios...</div>
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
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">Gestión de Usuarios</h2>
        <Button
          onClick={() => navigate("/portal/users/new")}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Nuevo Usuario
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.department || "Sin asignar"}</TableCell>
                  <TableCell>{getStatusBadge(user.deleted_at)}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => navigate(`/portal/users/edit/${user.id}`)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
