
"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { expenses } from '@/lib/data';

const data = expenses.reduce((acc, expense) => {
    const type = expense.type;
    const existing = acc.find(item => item.name === type);
    if (existing) {
        existing.amount += expense.amount;
    } else {
        acc.push({ name: type, amount: expense.amount });
    }
    return acc;
}, [] as { name: string, amount: number }[]);

export function ExpenseCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `PKR ${Number(value) / 1000}k`} />
        <Tooltip formatter={(value) => `PKR ${Number(value).toLocaleString()}`} />
        <Legend />
        <Bar dataKey="amount" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
