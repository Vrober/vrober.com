'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * ProtectedRoute wrapper component
 * Protects routes that require authentication
 * Redirects to /login if user is not authenticated
 */
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount and when storage changes
    const checkAuth = () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        // Not authenticated - redirect to login
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
}
