"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function MostBookedServices() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get('/services/home-sections', { params: { limit: 8 } })
      .then((res) => {
        if (!active) return;
        setList(res.data.mostBooked || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load most booked');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Most Booked Services</h2>
      {loading && <p className="px-4 text-sm text-zinc-500">Loading...</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      <div className="grid grid-cols-2 gap-4 px-4">
        {list.map((s) => (
          <div
            key={s._id}
            className={`service-card bg-gray-100 text-gray-800 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg`}
          >
            <div className="mb-4 overflow-hidden rounded-xl">
              <Image
                src={s.imageUrl || '/assets/placeholder.png'}
                alt={s.serviceName}
                width={200}
                height={120}
                className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg leading-tight font-semibold">
                {s.serviceName}
              </h3>
              <p className="line-clamp-2 text-sm opacity-70">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">Booked {s.bookingCount || 0} times</span>
                <span className="text-sm font-medium">₹ {s.price || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
