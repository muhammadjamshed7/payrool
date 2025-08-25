"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Supplier } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(amount);
};

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "fabricType",
    header: "Fabric Type",
  },
  {
    accessorKey: "qualityTier",
    header: "Quality Tier",
    cell: ({ row }) => {
        const tier = row.getValue("qualityTier") as string;
        const variant = tier === 'Premium' ? 'default' : tier === 'Mid-Grade' ? 'secondary' : 'outline';
        const color = tier === 'Premium' ? 'bg-green-500' : tier === 'Mid-Grade' ? 'bg-yellow-500' : '';
        return <Badge variant={variant} className={cn(color)}>{tier}</Badge>
    }
  },
   {
    accessorKey: "contractStatus",
    header: "Contract Status",
    cell: ({ row }) => {
        const status = row.getValue("contractStatus") as string;
        const variant = status === 'Active' ? 'default' : status === 'Expired' ? 'destructive' : 'secondary';
        const color = status === 'Active' ? 'bg-green-500' : '';
        return <Badge variant={variant} className={cn(color)}>{status}</Badge>
    }
  },
  {
    accessorKey: "lastOrderDate",
    header: "Last Order",
    cell: ({ row }) => new Date(row.getValue("lastOrderDate")).toLocaleDateString(),
  },
  {
    accessorKey: "totalBusiness",
    header: "Total Business",
    cell: ({ row }) => formatCurrency(row.getValue("totalBusiness"))
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const supplier = row.original
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(supplier.id)}
            >
              Copy supplier ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Contract</DropdownMenuItem>
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
