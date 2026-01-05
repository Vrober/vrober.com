'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaArrowRight } from 'react-icons/fa6';
import ProtectedRoute from '../../_components/ProtectedRoute';

function FavoritesContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="-ml-2 rounded-lg p-2 transition hover:bg-slate-100"
          >
            <FaArrowLeft className="text-slate-900" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">
            Favorite Services
          </h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden border-b border-slate-200 bg-white px-10 py-8 lg:block">
        <h1 className="text-4xl font-bold text-slate-900">Favorite Services</h1>
        <p className="mt-2 text-slate-600">
          Your favorite professionals and services
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 pb-20">
        {/* Empty State */}
        <div className="py-12 text-center lg:py-20">
          <div className="mb-6 text-6xl">❤️</div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            No favorites yet
          </h2>
          <p className="mb-6 text-slate-600">
            Start adding your favorite services and professionals
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Browse Services
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <FavoritesContent />
    </ProtectedRoute>
  );
}
