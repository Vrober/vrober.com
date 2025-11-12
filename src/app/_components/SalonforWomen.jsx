"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function SalonforWomen() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get('/services', { params: { category: 'Grooming', limit: 10 } })
      .then((res) => { if (!active) return; setList(res.data.services || []); })
      .catch((err) => { if (!active) return; setError(err.response?.data?.message || 'Failed to load grooming'); })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Salon for Women</h2>
      {loading && <p className="px-4 text-sm text-zinc-500">Loading...</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
        {list.map((s) => (
          <div
            key={s._id}
            className={`service-card bg-gray-100 text-gray-800 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg`}
          >
            <div className="mb-4 h-[150px] w-[250px] overflow-hidden rounded-xl">
              <Image
                src={s.imageUrl || '/assets/placeholder.png'}
                alt={s.serviceName}
                width={200}
                height={120}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg leading-tight font-semibold">{s.serviceName}</h3>
              <p className="line-clamp-2 text-sm opacity-70">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">₹ {s.price || 0}</span>
                <span className="text-xs text-zinc-500">{s.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
