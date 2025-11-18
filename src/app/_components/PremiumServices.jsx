'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCrown, FaEye } from 'react-icons/fa6';
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
        setError(
          err.response?.data?.message || 'Failed to load premium services'
        );
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="my-8">
      {/* Section Header */}
      <div className="mb-6 px-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-2">
            <FaCrown className="text-xl text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Premium Services
            </h2>
            <p className="text-sm text-gray-600">
              High-quality professional services
            </p>
          </div>
        </div>
      </div>

      {loading && <p className="text-caption px-4 text-gray-600">Loading...</p>}
      {error && <p className="text-caption px-4 text-red-600">{error}</p>}

      {/* Service Cards */}
      <div className="space-y-4 px-4">
        {list.map((s, index) => (
          <div
            key={s._id}
            className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* Premium Badge */}
            <div className="absolute top-3 right-3 z-20">
              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                <FaCrown className="text-xs" /> Premium
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Service Image */}
              <Link href={`/services/${s._id}`} className="shrink-0">
                <div className="h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                  <Image
                    src={s.imageUrl || '/assets/placeholder.png'}
                    alt={s.serviceName}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>

              {/* Service Content */}
              <div className="min-w-0 flex-1">
                <Link href={`/services/${s._id}`}>
                  <h3 className="mb-1 line-clamp-2 text-base font-bold text-gray-800 transition-colors group-hover:text-gray-600">
                    {s.serviceName}
                  </h3>
                </Link>
                <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                  {s.description || 'Premium professional service'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">
                    ₹{s.price || 0}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/book?serviceId=${s._id}&serviceName=${encodeURIComponent(s.serviceName)}&price=${s.price}`}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-center text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-gray-700"
                >
                  Book Now
                </Link>
                <Link
                  href={`/services/${s._id}`}
                  className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-50"
                >
                  <FaEye className="text-xs" /> Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
