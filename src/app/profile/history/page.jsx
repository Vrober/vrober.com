"use client";
import { useEffect, useState } from 'react';
import { fetchUserBookings } from '@/lib/bookingService';

export default function OrderHistoryPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchUserBookings()
      .then((b) => {
        if (!active) return;
        setList(b);
      })
      .catch((e) => {
        if (!active) return;
        setError(e.message || 'Failed to load history');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Order History</h1>
      {loading && <p className="text-sm text-zinc-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && list.length === 0 && (
        <p className="text-sm text-zinc-500">No orders yet.</p>
      )}
      <div className="space-y-3">
        {list.map((b) => (
          <div key={b.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{b.serviceName}</p>
                <p className="text-sm text-zinc-500">{b.vendorName || 'Vendor'} • {b.date?.slice(0,10)} {b.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹ {b.price || 0}</p>
                <p className="text-xs text-zinc-500 uppercase">{b.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
