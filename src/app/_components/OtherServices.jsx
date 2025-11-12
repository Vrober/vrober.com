"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function OtherServices() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get('/services', { params: { limit: 40 } })
      .then((res) => {
        if (!active) return;
        const services = res.data.services || [];
        // Exclude already curated flags (popular/premium) so this shows the remainder variety
        const filtered = services.filter(
          (s) => !s.isPopular && !s.isPremium
        );
        // Light shuffle to vary appearance
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        setList(shuffled.slice(0, 8));
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err.response?.data?.message || 'Failed to load other services'
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="my-9 px-4">
      <h2 className="Seaction-heading">Other Services</h2>
      {loading && (
        <p className="text-sm text-zinc-500">Loading additional services...</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid grid-cols-1 gap-3">
        {list.map((service) => (
          <div
            key={service._id}
            className="group rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-3 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 overflow-hidden rounded-xl ring-2 ring-gray-100 transition-all duration-300 group-hover:ring-blue-200">
                  <Image
                    src={service.imageUrl || '/assets/placeholder.png'}
                    alt={service.serviceName}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-bold text-gray-900">
                  {service.serviceName}
                </h3>
                <p className="mb-1 line-clamp-1 text-sm text-gray-600">
                  {service.description || service.serviceType}
                </p>
                <div className="flex items-center space-x-1">
                  <span className="text-base font-bold text-blue-600">
                    ₹ {service.price || 0}
                  </span>
                  <span className="text-xs text-gray-500">onwards</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-blue-600">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
        {!loading && list.length === 0 && !error && (
          <p className="text-sm text-zinc-500">No additional services found.</p>
        )}
      </div>
    </div>
  );
}
