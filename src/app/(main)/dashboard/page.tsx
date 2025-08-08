import { PageHeader } from "@/components/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PayrollChart } from "@/components/dashboard/payroll-chart";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { DollarSign, Users, FileText, CheckCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Dashboard" />
      <Separator />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mt-6">
        <StatsCard title="Total Employees" value="12" icon={Users} />
        <StatsCard title="Total Payroll (Month)" value="$15,231.89" icon={DollarSign} description="+20.1% from last month" />
        <StatsCard title="Payrolls Generated" value="8" icon={FileText} />
        <StatsCard title="Paid Status" value="6" icon={CheckCircle} />
        <StatsCard title="Pending Status" value="2" icon={Clock} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PayrollChart />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>
              You made 26 payments this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
