export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Manager' | 'Director' | 'Worker';
  avatar?: string;
}

export type EmployeeRole = 'Worker' | 'Manager' | 'Director';
export type EmployeeShift = 'Morning' | 'Evening';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  salary: number;
  shift: EmployeeShift;
  status: 'Active' | 'On Leave';
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Paid Leave';

export interface Attendance {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  baseSalary: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending';
  generatedDate: string;
}

export type FabricType = 'Cotton' | 'Polyester' | 'Silk' | 'Wool' | 'Blended';
export type QualityTier = 'Premium' | 'Mid-Grade' | 'Economy';
export type ContractStatus = 'Active' | 'Pending' | 'Expired';

export interface Supplier {
  id: string;
  name: string;
  fabricType: FabricType;
  qualityTier: QualityTier;
  contractStatus: ContractStatus;
  lastOrderDate: string;
  totalBusiness: number;
}

export type ExpenseType = 'General' | 'Salary Advance' | 'Bonus' | 'Supplies' | 'Petty Cash';

export interface Expense {
  id: string;
  itemName: string;
  type: ExpenseType;
  amount: number;
  date: string;
  employeeId?: string;
}
