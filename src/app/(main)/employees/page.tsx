"use client"

import { useState } from "react";
import { employees as initialEmployees } from "@/lib/data";
import type { Employee } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";

// This is a mock implementation. In a real app, you'd use a state manager or server-side data fetching.
export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (employee: Omit<Employee, 'id' | 'status'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      status: 'Active',
    }
    setEmployees(prev => [...prev, newEmployee]);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Employees">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </PageHeader>
      <Separator />
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
