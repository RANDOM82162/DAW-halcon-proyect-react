import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Support() {
  const contactInfo = [
    {
      icon: Phone,
      label: "Teléfono",
      value: "+52 (55) 1234-5678",
      description: "Lunes - Viernes, 8:00 AM - 6:00 PM",
    },
    {
      icon: Mail,
      label: "Correo Electrónico",
      value: "pedidos@constructorahalcon.com",
      description: "Respuesta en menos de 24 horas",
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: "Av. Construcción 456, Piso 2",
      description: "Col. Industrial, Ciudad de México",
    },
    {
      icon: Clock,
      label: "Horario de Atención",
      value: "Lunes - Viernes: 8:00 AM - 6:00 PM",
      description: "Sábados: 9:00 AM - 2:00 PM",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Soporte</h2>
        <p className="text-gray-600">Contacte a nuestro equipo de soporte</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">{info.label}</h4>
                  <p className="text-gray-900 mb-1">{info.value}</p>
                  <p className="text-gray-500">{info.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Preguntas Frecuentes</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-gray-900 mb-2">¿Cómo puedo hacer un pedido?</h4>
            <p className="text-gray-600">
              Navegue a la sección "Nuevo Pedido" y complete el formulario con los materiales que necesita. Recibirá una confirmación por correo.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-gray-900 mb-2">¿Dónde puedo ver el estado de mis pedidos?</h4>
            <p className="text-gray-600">
              Vaya a "Mis Pedidos" para ver el historial completo y el estado actual de cada pedido.
            </p>
          </div>
          <div className="pb-4">
            <h4 className="text-gray-900 mb-2">¿Cuál es el tiempo de entrega?</h4>
            <p className="text-gray-600">
              El tiempo de entrega varía según el material y la ubicación. Generalmente entre 2-5 días hábiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
