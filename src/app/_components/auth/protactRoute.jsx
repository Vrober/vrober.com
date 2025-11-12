'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/authService';

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(redirectTo);
    }
  }, [router, redirectTo]);

  // Show loading or nothing while checking auth
  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}
