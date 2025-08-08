
"use client"

import { useState } from "react";
import { payrolls as initialPayrolls, employees } from "@/lib/data";
import type { Payroll, Employee } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "../employees/data-table"; // Reusing the generic data table
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { InvoiceDialog } from "./invoice-dialog";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>(initialPayrolls);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedEmployeeForInvoice, setSelectedEmployeeForInvoice] = useState<Employee | null>(null);

  const handleViewInvoice = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
        setSelectedEmployeeForInvoice(employee);
        setIsInvoiceDialogOpen(true);
    }
  }

  const handleGenerateNewInvoice = () => {
    setSelectedEmployeeForInvoice(null);
    setIsInvoiceDialogOpen(true);
  }

  const columns: ColumnDef<Payroll>[] = [
    { accessorKey: "id", header: "Payroll ID" },
    { 
      accessorKey: "employeeId", 
      header: "Employee",
      cell: ({ row }) => employees.find(e => e.id === row.getValue("employeeId"))?.name || 'N/A'
    },
    {
      accessorKey: "month",
      header: "Month/Year",
      cell: ({ row }) => `${row.original.month} ${row.original.year}`
    },
    { 
      accessorKey: "netSalary", 
      header: "Net Salary",
      cell: ({ row }) => formatCurrency(row.getValue("netSalary"))
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === 'Paid' ? 'default' : 'secondary'} className={status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}>{status}</Badge>
      }
    },
    { accessorKey: "generatedDate", header: "Date" },
    {
      id: "actions",
      cell: ({ row }) => {
        const payroll = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewInvoice(payroll.employeeId)}>View Invoice</DropdownMenuItem>
              <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Void</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  return (
    <>
      <InvoiceDialog 
        open={isInvoiceDialogOpen} 
        onOpenChange={setIsInvoiceDialogOpen}
        employee={selectedEmployeeForInvoice}
      />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Payroll">
          <Button onClick={handleGenerateNewInvoice}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate Invoice
          </Button>
        </PageHeader>
        <Separator />
        <DataTable columns={columns} data={payrolls} />
      </div>
    </>
  );
}
