'use client';
import Image from 'next/image';
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
    api.get('/services', { params })
      .then(res => { if (active) setServices(res.data.services || []); })
      .catch(err => { if (active) setError(err.response?.data?.message || 'Failed to load services'); })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [categoryParam]);

  const categoryTitle = categoryParam === 'all' ? 'All Services' : (services[0]?.category || decodeURIComponent(categoryParam));

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="rounded-full bg-zinc-100 p-2 shadow"
        >
          <FaArrowLeft />
        </button>
  <h1 className="text-xl font-semibold capitalize">{categoryTitle || 'Services'}</h1>
      </div>
      {loading && <p className="text-sm text-zinc-500">Loading...</p>}
      {error && !loading && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {!loading && !error && services.length === 0 && (
        <p className="text-sm text-zinc-500">No services found in this category.</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {services.map((svc) => (
          <div
            key={svc._id}
            className="group rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:border-black"
          >
            <div className="mb-2 h-24 w-full overflow-hidden rounded-md bg-zinc-100">
              <Image
                src={svc.imageUrl || '/assets/placeholder.png'}
                alt={svc.serviceName}
                width={160}
                height={96}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <h2 className="mb-1 line-clamp-1 text-sm font-medium capitalize">
              {svc.serviceName}
            </h2>
            <p className="mb-2 text-xs text-zinc-500 line-clamp-2">
              {svc.description}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">₹{svc.price}</span>
              <span className="flex items-center gap-1 text-yellow-600">
                <FaStar className="text-[10px]" />
                {svc.rating || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
