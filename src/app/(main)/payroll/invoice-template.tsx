
import { Logo } from "@/components/icons/logo"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Employee } from "@/lib/types"

interface InvoiceTemplateProps {
  employee: Employee;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(amount);
  };

export function InvoiceTemplate({ employee }: InvoiceTemplateProps) {
  const issueDate = new Date().toLocaleDateString();
  const salary = employee.salary;
  const leaveDeductions = 1200.50; // Mock data
  const taxes = salary * 0.10; // Mock 10% tax
  const totalDeductions = leaveDeductions + taxes;
  const netSalary = salary - totalDeductions;

  return (
    <div className="p-2 bg-white text-black font-sans printable-area">
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
            padding: 2rem;
          }
        }
      `}</style>
      <header className="flex items-start justify-between pb-4">
        <div className="flex items-center gap-4">
          <Logo />
          <div>
              <h2 className="text-lg font-bold">ModernTextile Inc.</h2>
              <p className="text-xs text-gray-600">123 Business Rd., Suite 100</p>
              <p className="text-xs text-gray-600">Business City, Pakistan 12345</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">PAYSLIP</h1>
          <p className="text-sm">#INV-{Date.now().toString().slice(-6)}</p>
        </div>
      </header>
      <Separator className="my-4 bg-gray-300"/>
      <section className="grid grid-cols-2 gap-4 text-sm mb-8">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Employee Details:</h3>
          <p>{employee.name}</p>
          <p>ID: {employee.id}</p>
          <p>Role: {employee.role}</p>
        </div>
        <div className="text-right">
          <p><span className="font-semibold">Issue Date:</span> {issueDate}</p>
          <p><span className="font-semibold">Salary Month:</span> {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>

      <section>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[60%]">Earnings</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Monthly Salary</TableCell>
              <TableCell className="text-right">{formatCurrency(salary)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="mt-4">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[60%]">Deductions</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Leave Deductions</TableCell>
              <TableCell className="text-right">{formatCurrency(leaveDeductions)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Taxes (10%)</TableCell>
              <TableCell className="text-right">{formatCurrency(taxes)}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
                <TableCell className="font-semibold">Total Deductions</TableCell>
                <TableCell className="text-right font-semibold">{formatCurrency(totalDeductions)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      <section className="mt-8 text-right">
        <div className="inline-block p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between gap-8">
                <span className="font-bold text-lg">Net Salary Payable:</span>
                <span className="font-bold text-lg">{formatCurrency(netSalary)}</span>
            </div>
        </div>
      </section>

      <footer className="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
        <p>This is a computer-generated document and does not require a signature.</p>
        <p>ModernTextile Inc.</p>
      </footer>
    </div>
  );
}
