"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
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
        setError(err.response?.data?.message || 'Failed to load popular services');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Popular Services</h2>
      {loading && <p className="px-4 text-sm text-zinc-500">Loading...</p>}
      {error && <p className="px-4 text-sm text-red-600">{error}</p>}
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
        {list.map((s) => (
          <div
            key={s._id}
            className="max-w-[340px] min-w-[300px] flex-shrink-0 rounded-lg bg-[#F2F2F2] p-4"
          >
            <div className="flex gap-3">
              <div className="h-25 w-25 shrink-0 overflow-hidden rounded-md border-2 border-white bg-zinc-200">
                <Image
                  className="h-full w-full shrink-0 object-cover"
                  src={s.imageUrl || '/assets/placeholder.png'}
                  alt={s.serviceName}
                  height={1000}
                  width={1000}
                />
              </div>
              <div>
                <h1 className="text-xl leading-6 font-semibold text-zinc-700">
                  {s.serviceName}
                </h1>
                <p className="line-clamp-2 leading-5 text-zinc-500">
                  {s.description}
                </p>
                <p className="flex items-center gap-2">
                  <FaStar className="h-4 w-4 text-yellow-400" />
                  {s.rating?.toFixed?.(1) || s.rating || '0.0'}
                </p>
                <p>
                  ₹ {s.price || 0}
                </p>
              </div>
            </div>
            <button className="w-full rounded-md border border-gray-400 bg-black py-1 font-bold text-white">
              Book now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
