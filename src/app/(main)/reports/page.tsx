
"use client"
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PayrollStatusChart } from "@/components/reports/payroll-status-chart";
import { ExpenseCategoryChart } from "@/components/reports/expense-category-chart";
import { AttendanceTrendChart } from "@/components/reports/attendance-trend-chart";

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Reports" />
      <Separator />

      <div className="grid gap-6 mt-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Status</CardTitle>
            <CardDescription>Overview of paid and pending salaries.</CardDescription>
          </CardHeader>
          <CardContent>
            <PayrollStatusChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Breakdown of expenses by their type.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseCategoryChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Daily attendance summary for the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceTrendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
