
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { employees } from "@/lib/data"
import { useState, useEffect } from "react"
import { InvoiceTemplate } from "./invoice-template"
import type { Employee } from "@/lib/types"

interface InvoiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    employee: Employee | null;
}

export function InvoiceDialog({ open, onOpenChange, employee: initialEmployee }: InvoiceDialogProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(initialEmployee);
    const [showInvoice, setShowInvoice] = useState(false);

    useEffect(() => {
        setSelectedEmployee(initialEmployee);
        if (initialEmployee) {
            setShowInvoice(true);
        }
    }, [initialEmployee, open]);

    const handleGenerate = () => {
        if (selectedEmployee) {
            setShowInvoice(true);
        }
    }

    const handleClose = () => {
        setShowInvoice(false);
        setSelectedEmployee(null);
        onOpenChange(false);
    }
    
    if (showInvoice && selectedEmployee) {
        return (
            <Dialog open={showInvoice} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-4xl">
                    <InvoiceTemplate employee={selectedEmployee} />
                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>Close</Button>
                        <Button onClick={() => window.print()}>Download PDF</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Generate Salary Invoice</DialogTitle>
                    <DialogDescription>
                        Select an employee to generate their salary invoice.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="employee" className="text-right">
                            Employee
                        </Label>
                        <Select onValueChange={(val) => setSelectedEmployee(employees.find(e => e.id === val) || null)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employees.map(emp => (
                                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleGenerate} disabled={!selectedEmployee}>Generate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
