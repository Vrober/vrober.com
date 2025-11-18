'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import api from '@/lib/axios';

export default function CategoryService() {
  const params = useParams();
  const router = useRouter();
  const categoryParam = params.id; // category name or 'all'

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryParam) return;
    let active = true;
    setLoading(true);
    setError(null);
    const params = { limit: 50 };
    if (categoryParam !== 'all') params.category = categoryParam;
    api
      .get('/services', { params })
      .then((res) => {
        if (active) setServices(res.data.services || []);
      })
      .catch((err) => {
        if (active)
          setError(err.response?.data?.message || 'Failed to load services');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [categoryParam]);

  const categoryTitle =
    categoryParam === 'all'
      ? 'All Services'
      : services[0]?.category || decodeURIComponent(categoryParam);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-full border border-gray-200 bg-gray-100 p-2 shadow-sm transition-colors hover:bg-gray-200"
          >
            <FaArrowLeft className="text-black" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-black capitalize">
              {categoryTitle || 'Services'}
            </h1>
            <p className="text-sm text-gray-500">
              {services.length} service{services.length !== 1 ? 's' : ''}{' '}
              available
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        {loading && (
          <p className="text-caption text-gray-600">Loading services...</p>
        )}
        {error && !loading && (
          <p className="text-caption text-red-600">{error}</p>
        )}
        {!loading && !error && services.length === 0 && (
          <div className="py-12 text-center">
            <p className="mb-2 text-gray-500">
              No services found in this category.
            </p>
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-black transition-colors hover:text-gray-700"
            >
              Go back to explore other services
            </button>
          </div>
        )}
        <div className="space-y-4">
          {services.map((svc) => (
            <div
              key={svc._id}
              className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <Link href={`/services/${svc._id}`} className="shrink-0">
                  <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    <Image
                      src={svc.imageUrl || '/assets/placeholder.png'}
                      alt={svc.serviceName}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/services/${svc._id}`}>
                    <h2 className="text-body mb-1 line-clamp-1 font-semibold text-black capitalize transition-colors hover:text-gray-700">
                      {svc.serviceName}
                    </h2>
                  </Link>
                  <p className="text-caption mb-2 line-clamp-2 text-gray-600">
                    {svc.description || 'Professional service'}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-xs text-gray-400" />
                      <span className="text-caption font-medium text-gray-700">
                        {svc.rating?.toFixed?.(1) || svc.rating || '4.5'}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-black">
                      ₹{svc.price || 0}
                    </span>
                    {svc.duration && (
                      <span className="text-caption text-gray-500">
                        {svc.duration}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/book?serviceId=${svc._id}&serviceName=${encodeURIComponent(svc.serviceName)}&price=${svc.price}`}
                    className="rounded-lg bg-black px-4 py-2 text-center text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-gray-800"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={`/services/${svc._id}`}
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
    </div>
  );
}
