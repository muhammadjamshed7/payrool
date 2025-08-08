"use client";

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileText,
  Truck,
  Wallet,
  Settings,
  LogOut,
  User as UserIcon,
  Loader2,
  FilePieChart,
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/employees', icon: Users, label: 'Employees' },
  { href: '/attendance', icon: CalendarCheck, label: 'Attendance' },
  { href: '/payroll', icon: FileText, label: 'Payroll' },
  { href: '/suppliers', icon: Truck, label: 'Suppliers' },
  { href: '/expenses', icon: Wallet, label: 'Expenses' },
  { href: '/reports', icon: FilePieChart, label: 'Reports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo />
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  onClick={() => router.push(item.href)}
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2 p-2">
             <div className="flex items-center gap-2 p-2 rounded-md">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback><UserIcon /></AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                    <p className="font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
                </div>
            </div>
            <SidebarMenuButton onClick={logout}>
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
