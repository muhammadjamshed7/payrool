
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { payrolls } from '@/lib/data';

const data = payrolls.reduce((acc, payroll) => {
    const status = payroll.status;
    const existing = acc.find(item => item.name === status);
    if (existing) {
        existing.value += 1;
    } else {
        acc.push({ name: status, value: 1 });
    }
    return acc;
}, [] as { name: 'Paid' | 'Pending', value: number }[]);

const COLORS = ['#16a34a', '#facc15']; // Green for Paid, Yellow for Pending

export function PayrollStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} payrolls`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
