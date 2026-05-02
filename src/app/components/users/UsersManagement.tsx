import { useState } from "react";
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

export function UsersManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 2,
      name: "admin",
      email: "admin@admin.com",
      role: "Admin",
      department: "Sin asignar",
      status: "Activo",
      registrationDate: "22/04/2026",
    },
    {
      id: 3,
      name: "Juan Pérez",
      email: "juan@constructora.com",
      role: "Gerente",
      department: "Operaciones",
      status: "Activo",
      registrationDate: "15/03/2026",
    },
    {
      id: 4,
      name: "María García",
      email: "maria@constructora.com",
      role: "Empleado",
      department: "Ventas",
      status: "Activo",
      registrationDate: "10/02/2026",
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      Admin: { className: "bg-red-500 text-white" },
      Gerente: { className: "bg-blue-500 text-white" },
      Empleado: { className: "bg-gray-500 text-white" },
    };
    const variant = variants[role as keyof typeof variants];
    return <Badge className={variant.className}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return <Badge className="bg-green-500 text-white">{status}</Badge>;
  };

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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.registrationDate}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
