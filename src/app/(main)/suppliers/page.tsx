"use client"

import { useState } from "react";
import type { Supplier, FabricType, QualityTier, ContractStatus } from "@/lib/types";
import { suppliers as initialSuppliers } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "../employees/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";


const AddSupplierDialog = ({ onAddSupplier }: { onAddSupplier: (supplier: Omit<Supplier, 'id'>) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    onAddSupplier({
      name: data.name as string,
      fabricType: data.fabricType as FabricType,
      qualityTier: data.qualityTier as QualityTier,
      contractStatus: data.contractStatus as ContractStatus,
      lastOrderDate: data.lastOrderDate as string,
      totalBusiness: parseFloat(data.totalBusiness as string),
    });
    
    setIsOpen(false);
    e.currentTarget.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Enter the details of the new textile supplier.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
         <ScrollArea className="max-h-[60vh] p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Supplier Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fabricType">Fabric Type</Label>
                <Select name="fabricType" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fabric type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cotton">Cotton</SelectItem>
                    <SelectItem value="Polyester">Polyester</SelectItem>
                    <SelectItem value="Silk">Silk</SelectItem>
                    <SelectItem value="Wool">Wool</SelectItem>
                    <SelectItem value="Blended">Blended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualityTier">Quality Tier</Label>
                <Select name="qualityTier" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Mid-Grade">Mid-Grade</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractStatus">Contract Status</Label>
                <Select name="contractStatus" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalBusiness">Total Business (PKR)</Label>
                <Input id="totalBusiness" name="totalBusiness" type="number" step="1000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastOrderDate">Last Order Date</Label>
                <Input id="lastOrderDate" name="lastOrderDate" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} required />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Add Supplier</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

    const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
        const newSupplier: Supplier = {
        ...supplier,
        id: `SUP${String(suppliers.length + 1).padStart(3, '0')}`,
        }
        setSuppliers(prev => [newSupplier, ...prev]);
    }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Suppliers">
         <AddSupplierDialog onAddSupplier={addSupplier} />
      </PageHeader>
      <Separator />
      <DataTable columns={columns} data={suppliers} />
    </div>
  );
}
