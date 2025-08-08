"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Expense } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(amount);
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
  },
  {
    accessorKey: "itemName",
    header: "Item/Description",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
        const type = row.getValue("type") as string;
        let variant: "default" | "secondary" | "destructive" | "outline" = "default";
        if (type === 'Petty Cash') variant = 'secondary';
        if (type === 'Supplies') variant = 'outline';
        if (type === 'Salary Advance' || type === 'Bonus') variant = 'destructive';

        return <Badge variant={variant}>{type}</Badge>
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount"))
  },
];
