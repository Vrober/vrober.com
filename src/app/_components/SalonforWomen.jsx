'use client';
import Image from 'next/image';
import Link from 'next/link';
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
      .then((res) => {
        if (!active) return;
        setList(res.data.services || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load grooming');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="my-8">
      <h2 className="Seaction-heading px-4 text-gray-800">Salon for Women</h2>
      {loading && <p className="text-caption px-4 text-gray-600">Loading...</p>}
      {error && <p className="text-caption px-4 text-red-600">{error}</p>}
      <div className="space-y-4 px-4">
        {list.map((s) => (
          <div
            key={s._id}
            className="service-card rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <Link href={`/services/${s._id}`} className="shrink-0">
                <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  <Image
                    src={s.imageUrl || '/assets/placeholder.png'}
                    alt={s.serviceName}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/services/${s._id}`}>
                  <h3 className="text-body mb-1 font-semibold text-gray-800 transition-colors hover:text-gray-600">
                    {s.serviceName}
                  </h3>
                </Link>
                <p className="text-caption mb-2 line-clamp-2 text-gray-600">
                  {s.description || 'Professional salon service'}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-black">
                    ₹{s.price || 0}
                  </span>
                  <span className="text-caption text-gray-500">
                    {s.duration || '1-2 hrs'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/book?serviceId=${s._id}&serviceName=${encodeURIComponent(s.serviceName)}&price=${s.price}`}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-center text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-gray-700"
                >
                  Book Now
                </Link>
                <Link
                  href={`/services/${s._id}`}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium whitespace-nowrap text-black transition-colors hover:bg-gray-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
