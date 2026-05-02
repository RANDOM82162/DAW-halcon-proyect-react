import { FileText, Download, Eye } from "lucide-react";
import { Button } from "./ui/button";

export function Documents() {
  const documents = [
    {
      name: "Construction Contract",
      type: "PDF",
      size: "2.4 MB",
      date: "2026-01-10",
      icon: FileText,
    },
    {
      name: "Architectural Blueprints",
      type: "PDF",
      size: "15.8 MB",
      date: "2026-01-10",
      icon: FileText,
    },
    {
      name: "Project Quotation",
      type: "PDF",
      size: "1.2 MB",
      date: "2025-12-20",
      icon: FileText,
    },
    {
      name: "Payment Receipts",
      type: "ZIP",
      size: "4.5 MB",
      date: "2026-04-15",
      icon: FileText,
    },
    {
      name: "Building Permits",
      type: "PDF",
      size: "3.1 MB",
      date: "2026-01-05",
      icon: FileText,
    },
    {
      name: "Material Specifications",
      type: "PDF",
      size: "8.6 MB",
      date: "2026-02-01",
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Documents</h2>
        <p className="text-gray-600">Access all project-related documents and files</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1 truncate">{doc.name}</h4>
                  <p className="text-gray-500 mb-3">
                    {doc.type} • {doc.size}
                  </p>
                  <p className="text-gray-400 mb-4">{doc.date}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
