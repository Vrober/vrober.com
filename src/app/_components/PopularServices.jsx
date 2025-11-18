'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaStar, FaFire, FaArrowRight, FaEye } from 'react-icons/fa6';
import api from '@/lib/axios';

export default function PopularServices() {
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
        setList(res.data.popular || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err.response?.data?.message || 'Failed to load popular services'
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
      <div className="mb-6 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-2">
            <FaFire className="text-xl text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Popular Services
            </h2>
            <p className="text-sm text-gray-600">Most loved by customers</p>
          </div>
        </div>
        <Link
          href="/category/Popular"
          className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
        >
          View All <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {loading && <p className="text-caption px-4 text-gray-600">Loading...</p>}
      {error && <p className="text-caption px-4 text-red-600">{error}</p>}

      {/* Horizontal Scrolling Grid */}
      <div className="px-4">
        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
          {list.map((s, index) => (
            <div
              key={s._id}
              className="group relative min-w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Popular Badge */}
              <div className="absolute top-3 right-3 z-20">
                <span className="flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                  <FaFire className="text-xs" /> Popular
                </span>
              </div>

              {/* Service Image */}
              <Link href={`/services/${s._id}`} className="block">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={s.imageUrl || '/assets/placeholder.png'}
                    alt={s.serviceName}
                    height={160}
                    width={280}
                  />
                </div>
              </Link>

              {/* Service Content */}
              <div className="p-4">
                <Link href={`/services/${s._id}`}>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-green-600">
                    {s.serviceName}
                  </h3>
                </Link>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {s.description || 'Professional service'}
                </p>

                {/* Rating and Price Row */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-sm text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {s.rating?.toFixed?.(1) || s.rating || '4.5'}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{s.price || 0}
                  </span>
                </div>

                {/* Action Buttons - Fixed alignment */}
                <div className="flex gap-2">
                  <Link
                    href={`/book?serviceId=${s._id}&serviceName=${encodeURIComponent(s.serviceName)}&price=${s.price}`}
                    className="flex-1 rounded-lg bg-gray-800 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={`/services/${s._id}`}
                    className="flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <FaEye className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
