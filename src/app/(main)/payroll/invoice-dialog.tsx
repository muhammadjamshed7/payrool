
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
import { useState, useEffect, useRef } from "react"
import { InvoiceTemplate } from "./invoice-template"
import type { Employee } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { Loader2 } from "lucide-react"


interface InvoiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    employee: Employee | null;
}

export function InvoiceDialog({ open, onOpenChange, employee: initialEmployee }: InvoiceDialogProps) {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(initialEmployee);
    const [showInvoice, setShowInvoice] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const invoiceRef = useRef<HTMLDivElement>(null);

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

    const handleDownloadPdf = async () => {
        if (!invoiceRef.current) return;
        setIsDownloading(true);
        try {
            const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice-${selectedEmployee?.id}-${Date.now()}.pdf`);
        } catch (error) {
            console.error("Error generating PDF", error);
        } finally {
            setIsDownloading(false);
        }
    }
    
    if (showInvoice && selectedEmployee) {
        return (
            <Dialog open={showInvoice} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Salary Invoice</DialogTitle>
                         <DialogDescription>
                            Review the invoice details below. You can download it as a PDF.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] rounded-md border p-4">
                        <div ref={invoiceRef}>
                           <InvoiceTemplate employee={selectedEmployee} />
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose} disabled={isDownloading}>Close</Button>
                        <Button
                            onClick={handleDownloadPdf}
                            disabled={isDownloading}
                            className="shadow-lg shadow-primary/50 hover:shadow-primary/80 transition-shadow"
                        >
                            {isDownloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Download PDF
                        </Button>
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
