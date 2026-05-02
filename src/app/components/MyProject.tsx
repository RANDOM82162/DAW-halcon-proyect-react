export function MyProject() {
  const projectData = {
    name: "Modern Residential Complex - Tower A",
    location: "123 Main Street, Downtown District",
    startDate: "January 15, 2026",
    estimatedDelivery: "December 20, 2026",
    status: "In Progress",
  };

  const fields = [
    { label: "Project Name", value: projectData.name },
    { label: "Location", value: projectData.location },
    { label: "Start Date", value: projectData.startDate },
    { label: "Estimated Delivery", value: projectData.estimatedDelivery },
    { label: "Current Status", value: projectData.status, highlight: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">My Project</h2>
        <p className="text-gray-600">Detailed information about your construction project</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-gray-100 last:border-0">
              <div className="sm:w-1/3 text-gray-700">{field.label}</div>
              <div className={`sm:w-2/3 ${field.highlight ? "inline-flex" : ""}`}>
                {field.highlight ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {field.value}
                  </span>
                ) : (
                  <span className="text-gray-900">{field.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
