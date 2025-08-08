
"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { attendances } from '@/lib/data';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const last30Days = eachDayOfInterval({
  start: subDays(new Date(), 29),
  end: new Date(),
});

const data = last30Days.map(date => {
    const dateString = format(date, 'yyyy-MM-dd');
    const recordsForDate = attendances.filter(a => a.date === dateString);
    const present = recordsForDate.filter(a => a.status === 'Present').length;
    const absent = recordsForDate.filter(a => a.status === 'Absent').length;
    const onLeave = recordsForDate.filter(a => a.status === 'Paid Leave').length;
    return {
        date: format(date, 'MMM dd'),
        Present: present,
        Absent: absent,
        'On Leave': onLeave,
    };
});

export function AttendanceTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Present" stroke="#16a34a" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Absent" stroke="#ef4444" />
        <Line type="monotone" dataKey="On Leave" stroke="#facc15" />
      </LineChart>
    </ResponsiveContainer>
  );
}
