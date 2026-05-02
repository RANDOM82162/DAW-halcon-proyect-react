import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface NavbarProps {
  breadcrumb: string;
  userName: string;
}

export function Navbar({ breadcrumb, userName }: NavbarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "CL";

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 left-64 right-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <span>Inicio</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{breadcrumb}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-700 capitalize">{userName}</span>
          <Avatar>
            <AvatarFallback className="bg-purple-600 text-white">{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
