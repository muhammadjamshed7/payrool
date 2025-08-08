import { format } from 'date-fns';
import type { Employee, Payroll, Expense, Attendance } from './types';

export const employees: Employee[] = [
  { id: 'EMP001', name: 'Ahmed Khan', role: 'Manager', salary: 150000, shift: 'Morning', status: 'Active' },
  { id: 'EMP002', name: 'Fatima Ali', role: 'Worker', salary: 60000, shift: 'Evening', status: 'Active' },
  { id: 'EMP003', name: 'Bilal Hassan', role: 'Worker', salary: 65000, shift: 'Morning', status: 'On Leave' },
  { id: 'EMP004', name: 'Ayesha Malik', role: 'Director', salary: 250000, shift: 'Morning', status: 'Active' },
  { id: 'EMP005', name: 'Zainab Omar', role: 'Worker', salary: 62000, shift: 'Evening', status: 'Active' },
];

export const payrolls: Payroll[] = [
  { id: 'PAY24001', employeeId: 'EMP001', month: 'July', year: 2024, baseSalary: 150000, deductions: 5000, netSalary: 145000, status: 'Paid', generatedDate: '2024-07-28' },
  { id: 'PAY24002', employeeId: 'EMP002', month: 'July', year: 2024, baseSalary: 60000, deductions: 2000, netSalary: 58000, status: 'Paid', generatedDate: '2024-07-28' },
  { id: 'PAY24003', employeeId: 'EMP003', month: 'July', year: 2024, baseSalary: 65000, deductions: 6500, netSalary: 58500, status: 'Paid', generatedDate: '2024-07-28' },
  { id: 'PAY24004', employeeId: 'EMP004', month: 'July', year: 2024, baseSalary: 250000, deductions: 25000, netSalary: 225000, status: 'Pending', generatedDate: '2024-07-28' },
  { id: 'PAY24005', employeeId: 'EMP005', month: 'August', year: 2024, baseSalary: 62000, deductions: 0, netSalary: 62000, status: 'Pending', generatedDate: '2024-08-01' },
];

export const recentSales = [
    { name: "Sana Ahmed", email: "sana.ahmed@example.com", amount: "+PKR 250,000" },
    { name: "Ali Raza", email: "ali.raza@example.com", amount: "+PKR 5,000" },
    { name: "Hira Khan", email: "hira.khan@example.com", amount: "+PKR 40,000" },
    { name: "Usman Tariq", email: "usman.tariq@example.com", amount: "+PKR 12,000" },
    { name: "Fatima Iqbal", email: "fatima.iqbal@example.com", amount: "+PKR 5,000" },
];

export const expenses: Expense[] = [
    { id: 'EXP001', itemName: 'Office Tea & Snacks', type: 'Petty Cash', amount: 2500, date: '2024-07-29' },
    { id: 'EXP002', itemName: 'Printer Paper Ream', type: 'Supplies', amount: 1500, date: '2024-07-28' },
    { id: 'EXP003', itemName: 'Advance to Bilal Hassan', type: 'Salary Advance', amount: 10000, date: '2024-07-25', employeeId: 'EMP003' },
    { id: 'EXP004', itemName: 'Cleaning Supplies', type: 'Petty Cash', amount: 1200, date: '2024-07-22' },
    { id: 'EXP005', itemName: 'Eid Bonus', type: 'Bonus', amount: 50000, date: '2024-07-20' },
    { id: 'EXP006', itemName: 'Transportation fare for documents', type: 'Petty Cash', amount: 500, date: '2024-07-19' },
];

// Generate dummy attendance data for the last 30 days
const today = new Date();
const dummyAttendances: Attendance[] = [];
for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = format(date, 'yyyy-MM-dd');

    employees.forEach((employee, index) => {
        if (employee.status === 'On Leave') {
            dummyAttendances.push({ id: `ATT${dateString}${employee.id}`, employeeId: employee.id, date: dateString, status: 'Paid Leave' });
            return;
        }

        const randomStatus = Math.random();
        let status: 'Present' | 'Absent' | 'Paid Leave';
        if (randomStatus < 0.9) { // 90% chance of being present
            status = 'Present';
        } else {
            status = 'Absent';
        }
        dummyAttendances.push({ id: `ATT${dateString}${employee.id}`, employeeId: employee.id, date: dateString, status: status });
    });
}
export const attendances: Attendance[] = dummyAttendances;
