"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function PremiumServices() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get('/services/home-sections', { params: { limit: 10 } })
      .then((res) => {
        if (!active) return;
        setList(res.data.premium || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load premium services');
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Premium Services</h2>
      {loading && <p className="px-4 text-sm text-zinc-500">Loading...</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
        {list.map((s) => (
          <div
            key={s._id}
            className="group relative max-w-[280px] min-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="absolute top-3 left-3 z-10 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
              Premium
            </div>
            <div className="relative h-48 overflow-hidden">
              <Image
                src={s.imageUrl || '/assets/placeholder.png'}
                alt={s.serviceName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="space-y-3 p-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-gray-800">
                  {s.serviceName}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {s.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-800">₹ {s.price || 0}</span>
              </div>
              <button className="w-full rounded-xl bg-black py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
