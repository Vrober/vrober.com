'use client';

import { useEffect, useState } from 'react';
import { fetchUserBookings, cancelBooking } from '@/lib/bookingService';
import ProtectedRoute from '@/app/_components/ProtectedRoute';

function BookingsPageContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    const data = await fetchUserBookings();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onCancel = async (id) => {
    try {
      await cancelBooking(id);
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to cancel');
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-black">My Bookings</h1>
        {loading ? (
          <div className="space-y-3">
            <div className="skeleton h-20 w-full rounded-lg" />
            <div className="skeleton h-20 w-full rounded-lg" />
            <div className="skeleton h-20 w-full rounded-lg" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-semibold text-black">{b.serviceName}</p>
                  <p className="text-sm text-gray-600">
                    {b.date?.slice(0, 10)} • {b.time}
                  </p>
                  {(b.partnerName || b.vendorName) && (
                    <p className="text-sm text-gray-600">
                      Partner: {b.partnerName || b.vendorName}
                    </p>
                  )}
                  {!b.partnerName && !b.vendorName && b.status === 'unassigned' && (
                    <p className="text-sm text-amber-600">
                      ⏳ Awaiting partner assignment
                    </p>
                  )}
                  <p className="text-sm font-medium text-black">₹{b.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      b.status === 'unassigned'
                        ? 'bg-amber-100 text-amber-800'
                        : b.status === 'pending' || b.status === 'assigned'
                          ? 'bg-blue-100 text-blue-800'
                          : b.status === 'accepted' || b.status === 'in-progress'
                            ? 'bg-purple-100 text-purple-800'
                            : b.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {b.status === 'unassigned' ? 'Finding Partner' :
                     b.status === 'assigned' ? 'Partner Assigned' :
                     b.status === 'in-progress' ? 'In Progress' :
                     b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                  {['unassigned', 'pending', 'assigned', 'accepted'].includes(b.status) && (
                    <button
                      className="btn-outline text-sm"
                      onClick={() => onCancel(b.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

// Wrap with ProtectedRoute
export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <BookingsPageContent />
    </ProtectedRoute>
  );
}
