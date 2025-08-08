"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { expenses as initialExpenses } from "@/lib/data";
import { DataTable } from "../employees/data-table";
import { columns } from "./columns";
import type { Expense, ExpenseType } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Custom Invoice Components ---
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
        <p className="font-semibold">Total Amount: <span className="text-2xl font-bold">PKR {parseFloat(data.amount).toFixed(2)}</span></p>
      </div>
       <footer className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
        <p>Thank you for your business!</p>
      </footer>
    </div>
  )
}

const CustomInvoiceDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>(null);

    const handleGenerateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        setInvoiceData(data);
        setIsDialogOpen(false); // Close form dialog
    };

    const handleCloseInvoice = () => setInvoiceData(null);

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                 <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Custom Invoice
                </Button>
            </DialogTrigger>
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
                    <Label htmlFor="amount">Amount (PKR)</Label>
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
    )
}

// --- Add Expense Dialog ---
const AddExpenseDialog = ({ onAddExpense }: { onAddExpense: (expense: Omit<Expense, 'id'>) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    onAddExpense({
      itemName: data.itemName as string,
      type: data.type as ExpenseType,
      amount: parseFloat(data.amount as string),
      date: data.date as string
    });
    
    setIsOpen(false);
    e.currentTarget.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Record a new expense or petty cash transaction.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item / Description</Label>
              <Input id="itemName" name="itemName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (PKR)</Label>
              <Input id="amount" name="amount" type="number" step="0.01" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="type">Expense Type</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petty Cash">Petty Cash</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                  <SelectItem value="Salary Advance">Salary Advance</SelectItem>
                  <SelectItem value="Bonus">Bonus</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} required />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


// --- Main Expenses Page ---
export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `EXP${String(expenses.length + 1).padStart(3, '0')}`,
    }
    setExpenses(prev => [newExpense, ...prev]);
  }

  const filteredExpenses = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return expenses;
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateRange.from! && expenseDate <= dateRange.to!;
    });
  }, [expenses, dateRange]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }, [filteredExpenses]);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Expenses">
          <div className="flex items-center gap-2">
            <AddExpenseDialog onAddExpense={addExpense} />
            <CustomInvoiceDialog />
          </div>
        </PageHeader>
        <Separator />

        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
            <div className="grid gap-2">
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className="w-full md:w-[300px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(totalExpenses)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        for the selected period
                    </p>
                </CardContent>
            </Card>
        </div>
        
        <DataTable columns={columns} data={filteredExpenses} />
      </div>
    </>
  );
}
