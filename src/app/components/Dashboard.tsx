import { Building2, TrendingUp, CreditCard, FileText, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const summaryCards = [
    {
      id: "project",
      title: "My Project",
      description: "View detailed information about your construction project",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      id: "progress",
      title: "Progress",
      description: "Track real-time updates on construction milestones",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      id: "payments",
      title: "Pending Payments",
      description: "Review payment schedules and upload receipts",
      icon: CreditCard,
      color: "bg-orange-500",
    },
    {
      id: "documents",
      title: "Documents",
      description: "Access contracts, blueprints, and project files",
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-gray-900 mb-2">Welcome to your client portal</h1>
        <p className="text-gray-600">
          Track your project progress, payments, and documents in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <Button
                    onClick={() => onNavigate(card.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
