
"use client";

import { useState, useMemo } from 'react';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { employees as allEmployees, attendances as initialAttendances } from '@/lib/data';
import type { Attendance, AttendanceStatus, Employee } from '@/lib/types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>(initialAttendances);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const attendanceForSelectedDate = useMemo(() => {
    return allEmployees.map(employee => {
      const attendanceRecord = attendances.find(
        a => a.employeeId === employee.id && a.date === formattedDate
      );
      return {
        employee,
        attendance: attendanceRecord,
      };
    });
  }, [attendances, formattedDate]);

  const handleStatusChange = (employeeId: string, newStatus: AttendanceStatus) => {
    setAttendances(prevAttendances => {
      const existingRecordIndex = prevAttendances.findIndex(
        a => a.employeeId === employeeId && a.date === formattedDate
      );

      if (existingRecordIndex > -1) {
        // Update existing record
        const updatedAttendances = [...prevAttendances];
        updatedAttendances[existingRecordIndex].status = newStatus;
        return updatedAttendances;
      } else {
        // Create new record
        const newRecord: Attendance = {
          id: `ATT-${employeeId}-${formattedDate}`,
          employeeId,
          date: formattedDate,
          status: newStatus,
        };
        return [...prevAttendances, newRecord];
      }
    });
  };

  const attendanceStats = useMemo(() => {
    const records = attendanceForSelectedDate.filter(r => r.attendance);
    const presentCount = records.filter(r => r.attendance?.status === 'Present').length;
    const totalCount = allEmployees.filter(e => e.status === 'Active').length; // Consider only active employees for progress
    const progress = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;
    return { presentCount, totalCount, progress };
  }, [attendanceForSelectedDate]);

  const getStatusBadgeVariant = (status?: AttendanceStatus) => {
    switch (status) {
      case 'Present':
        return 'default';
      case 'Absent':
        return 'destructive';
      case 'Paid Leave':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Attendance" />
      <Separator />
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column for Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              disabled={(date) => date > new Date()}
            />
          </CardContent>
        </Card>

        {/* Right column for Attendance Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Daily Attendance</CardTitle>
            <CardDescription>
              {format(selectedDate, 'EEEE, LLLL dd, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Daily Progress</h4>
                <span className="text-sm text-muted-foreground">{attendanceStats.presentCount} / {attendanceStats.totalCount} Present</span>
              </div>
              <Progress value={attendanceStats.progress} className="w-full" />
            </div>
            
            {/* Employee List */}
            <div className="space-y-4">
              {attendanceForSelectedDate.map(({ employee, attendance }) => (
                <div key={employee.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${employee.id}`} />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Badge variant={getStatusBadgeVariant(attendance?.status)} className={cn(
                       'w-24 justify-center',
                       { 'bg-green-500': attendance?.status === 'Present' }
                     )}>
                       {attendance?.status || 'Not Marked'}
                     </Badge>
                     <Select
                        value={attendance?.status}
                        onValueChange={(value: AttendanceStatus) => handleStatusChange(employee.id, value)}
                        disabled={employee.status === 'On Leave'}
                      >
                       <SelectTrigger className="w-[140px]">
                         <SelectValue placeholder="Mark Status" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Present">Present</SelectItem>
                         <SelectItem value="Absent">Absent</SelectItem>
                         <SelectItem value="Paid Leave">Paid Leave</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
