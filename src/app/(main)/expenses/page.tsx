import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ExpensesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Expenses" />
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Expense Tracking & Custom Invoices</CardTitle>
          <CardDescription>
            This feature is under development. Here you will be able to log daily expenses and generate custom invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
