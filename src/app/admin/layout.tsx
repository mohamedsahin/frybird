'use client';

import { usePathname } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  // Login screen has no sidebar/shell.
  if (pathname === '/admin/login') return <>{children}</>;
  return <AdminShell>{children}</AdminShell>;
}
