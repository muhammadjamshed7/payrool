
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CustomInvoiceTemplate = ({ data }: { data: any }) => {
  return (
    <div className="p-8 bg-white text-black font-sans printable-area">
       <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
      <header className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-2xl font-bold">{data.companyName || 'Your Company'}</h1>
          <p className="text-sm text-gray-600">{data.companyAddress || '123 Business Rd, Business City'}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-800">INVOICE</h2>
          <p className="text-sm">#INV-{Date.now().toString().slice(-6)}</p>
        </div>
      </header>
      <Separator className="my-4 bg-gray-300"/>
      <section className="grid grid-cols-2 gap-4 text-sm mb-8">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Bill To:</h3>
          <p>{data.customerName}</p>
          <p>{data.customerAddress}</p>
        </div>
        <div className="text-right">
            <p><span className="font-semibold">Issue Date:</span> {new Date(data.issueDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Due Date:</span> {new Date(data.dueDate).toLocaleDateString()}</p>
        </div>
      </section>
      <p className="text-sm mb-4">{data.notes}</p>
      <div className="text-right mt-8">
        <p className="font-semibold">Total Amount: <span className="text-2xl font-bold">${parseFloat(data.amount).toFixed(2)}</span></p>
      </div>
       <footer className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
        <p>Thank you for your business!</p>
      </footer>
    </div>
  )
}

export default function ExpensesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const handleGenerateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setInvoiceData(data);
  };

  const handleCloseInvoice = () => {
    setInvoiceData(null);
  }

  if (invoiceData) {
    return (
        <Dialog open={true} onOpenChange={handleCloseInvoice}>
            <DialogContent className="sm:max-w-4xl">
                <CustomInvoiceTemplate data={invoiceData} />
                <DialogFooter>
                    <Button variant="outline" onClick={handleCloseInvoice}>Close</Button>
                    <Button onClick={() => window.print()}>Download PDF</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Custom Invoices">
            <Button onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Custom Invoice
            </Button>
        </PageHeader>
        <Separator />
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">No invoices yet.</h2>
            <p className="text-muted-foreground mt-2">Create a custom invoice to get started.</p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Custom Invoice</DialogTitle>
            <DialogDescription>
              Fill in the details below to generate a new custom invoice.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGenerateInvoice}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" name="customerName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Customer Address</Label>
                <Input id="customerAddress" name="customerAddress" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" name="amount" type="number" step="0.01" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input id="issueDate" name="issueDate" type="date" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes / Description</Label>
                <Textarea id="notes" name="notes" placeholder="e.g. Payment for supplied materials" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="companyName">Your Company Name (Optional)</Label>
                <Input id="companyName" name="companyName" placeholder="ModernTextile" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Your Company Address (Optional)</Label>
                <Input id="companyAddress" name="companyAddress" placeholder="123 Business Rd, Business City" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Generate Invoice</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
