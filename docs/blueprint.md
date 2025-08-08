# **App Name**: ModernPay

## Core Features:

- Login System: Dummy login using email modern@gmail.com and password modern12345, with logout functionality.
- Employee Management: Add new employee with unique ID, name, role (Worker, Manager, Director), monthly salary, and shift assignment (Morning/Evening). Includes role-based UI management for different user roles.
- Attendance System: Daily attendance tracking with unique IDs, leave deduction rules (2-3% salary per extra leave if >= 2 leaves/month), and paid leave handling.
- Payroll & Invoice Generation: Auto-generate salary invoices with company logo, date, employee details, monthly salary, leave deductions, predefined taxes, and total payable amount. Supports custom invoice generation and PDF/Excel download.
- Reporting & Dashboard: Dashboard with overall payroll graph, employee-wise stats, filters for monthly/annual salary reports, clickable graphs for employee details, total employees, payrolls generated, pending/paid statuses, and shift-wise summary.
- Accounts & Supplier Module: Supplier list with supplier name, amount paid, custom invoice generation, and exportable payment reports.
- Expense & Custom Invoice Generator: Sidebar for adding daily expenses, filterable by employee/date/item type, including advance salary/bonuses as expense types. Includes custom invoice creation section with company logo, editable fields, auto-calculated amount, and PDF download with edit confirmation prompt.

## Style Guidelines:

- Primary color: Slate blue (#778899) evokes the textile industry by way of denim, and suggests security and professionalism.
- Background color: Very light gray (#F0F0F0), a muted version of slate blue, for a clean and unobtrusive backdrop.
- Accent color: Teal (#008080), a brighter color to contrast with the analogous gray-blue colors, drawing attention to key interactive elements.
- Body and headline font: 'PT Sans' (sans-serif) blends modernity and approachability, which will lend a subtle human touch to financial details.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use minimalist, professional icons related to payroll, employees, and reports.
- Clean, modular layout with clear separation of concerns. Prioritize a user-friendly experience with Tailwind CSS or ShadCN UI components.