import { Eye, Camera } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function ConstructionProgress() {
  const progressData = [
    {
      date: "2026-01-15",
      phase: "Foundation & Excavation",
      progress: 100,
      notes: "Completed ahead of schedule",
      status: "completed",
    },
    {
      date: "2026-02-10",
      phase: "Structural Framework",
      progress: 100,
      notes: "All columns and beams installed",
      status: "completed",
    },
    {
      date: "2026-03-20",
      phase: "Floor Slabs - Levels 1-5",
      progress: 85,
      notes: "Level 5 in progress",
      status: "in-progress",
    },
    {
      date: "2026-04-15",
      phase: "MEP Installation",
      progress: 45,
      notes: "Electrical and plumbing roughing",
      status: "in-progress",
    },
    {
      date: "2026-05-01",
      phase: "Interior Walls & Partitions",
      progress: 0,
      notes: "Scheduled to begin May 2026",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { label: "Completed", className: "bg-green-100 text-green-700" },
      "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-700" },
      pending: { label: "Pending", className: "bg-gray-100 text-gray-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Construction Progress</h2>
        <p className="text-gray-600">Track the status of each construction phase</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progressData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-600">{item.date}</TableCell>
                <TableCell>{item.phase}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-gray-700 min-w-[45px]">{item.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{item.notes}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4" />
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
