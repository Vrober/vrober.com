'use client';

import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

export default function ConditionalNav() {
  const pathname = usePathname();

  // Hide navigation on login page
  if (pathname === '/login') {
    return null;
  }

  return <MobileNav />;
}
