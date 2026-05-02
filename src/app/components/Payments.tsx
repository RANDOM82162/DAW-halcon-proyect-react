import { Eye, Upload } from "lucide-react";
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

export function Payments() {
  const paymentsData = [
    {
      concept: "Initial Deposit (20%)",
      dueDate: "2026-01-15",
      amount: "$50,000",
      status: "paid",
    },
    {
      concept: "Foundation Completion (15%)",
      dueDate: "2026-02-15",
      amount: "$37,500",
      status: "paid",
    },
    {
      concept: "Structural Progress (20%)",
      dueDate: "2026-03-30",
      amount: "$50,000",
      status: "paid",
    },
    {
      concept: "MEP Installation (15%)",
      dueDate: "2026-05-15",
      amount: "$37,500",
      status: "pending",
    },
    {
      concept: "Finishing Works (20%)",
      dueDate: "2026-08-30",
      amount: "$50,000",
      status: "pending",
    },
    {
      concept: "Final Payment (10%)",
      dueDate: "2026-12-20",
      amount: "$25,000",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { label: "Paid", className: "bg-green-100 text-green-700" },
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
      overdue: { label: "Overdue", className: "bg-red-100 text-red-700" },
    };
    const variant = variants[status as keyof typeof variants];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Payments</h2>
        <p className="text-gray-600">Review payment schedules and manage receipts</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concept</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentsData.map((payment, index) => (
              <TableRow key={index}>
                <TableCell>{payment.concept}</TableCell>
                <TableCell className="text-gray-600">{payment.dueDate}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    {payment.status === "paid" ? (
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Receipt
                      </Button>
                    ) : (
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Receipt
                      </Button>
                    )}
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
