import type { Employee, Payroll } from './types';

export const employees: Employee[] = [
  { id: 'EMP001', name: 'Alice Johnson', role: 'Manager', salary: 75000, shift: 'Morning', status: 'Active' },
  { id: 'EMP002', name: 'Bob Williams', role: 'Worker', salary: 45000, shift: 'Evening', status: 'Active' },
  { id: 'EMP003', name: 'Charlie Brown', role: 'Worker', salary: 48000, shift: 'Morning', status: 'On Leave' },
  { id: 'EMP004', name: 'Diana Miller', role: 'Director', salary: 120000, shift: 'Morning', status: 'Active' },
  { id: 'EMP005', name: 'Ethan Davis', role: 'Worker', salary: 46000, shift: 'Evening', status: 'Active' },
];

export const payrolls: Payroll[] = [
  { id: 'PAY24001', employeeId: 'EMP001', month: 'July', year: 2024, baseSalary: 75000, deductions: 2500, netSalary: 72500, status: 'Paid', generatedDate: '2024-07-28' },
  { id: 'PAY24002', employeeId: 'EMP002', month: 'July', year: 2024, baseSalary: 45000, deductions: 1500, netSalary: 43500, status: 'Paid', generatedDate: '2024-07-28' },
  { id: 'PAY24003', employeeId: 'EMP003', month: 'July', year: 2024, baseSalary: 48000, deductions: 4800, netSalary: 43200, status: 'Paid', generatedDate: '2024-07-28' },
  { id: 'PAY24004', employeeId: 'EMP004', month: 'July', year: 2024, baseSalary: 120000, deductions: 12000, netSalary: 108000, status: 'Pending', generatedDate: '2024-07-28' },
  { id: 'PAY24005', employeeId: 'EMP005', month: 'August', year: 2024, baseSalary: 46000, deductions: 0, netSalary: 46000, status: 'Pending', generatedDate: '2024-08-01' },
];

export const recentSales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
]
