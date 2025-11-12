"use client";
import Image from 'next/image';
import { FaCamera, FaStar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function UserProfileCard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ orders: 0, avgRating: 0, points: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get('/users/me')
      .then((res) => {
        if (!active) return;
        setUser(res.data.user);
        setStats(res.data.stats || { orders: 0, avgRating: 0, points: 0 });
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load profile');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const avatar = user?.profileImg || '/assets/placeholder.png';
  const name = user?.name || 'User';
  const email = user?.email || user?.mobileNo || '';

  return (
    <div className="relative z-20 mx-4 -mt-8 mb-6 rounded-2xl border border-gray-100 bg-white shadow-lg">
      <div className="p-6 text-center">
        {/* Profile Avatar */}
        <div className="relative mb-4">
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full shadow-lg ring-4 ring-white bg-zinc-100">
            {loading ? (
              <div className="h-full w-full animate-pulse bg-zinc-200" />
            ) : (
              <Image src={avatar} alt={name} width={96} height={96} className="h-full w-full object-cover" />
            )}
          </div>
          {/* Camera Icon (non-functional placeholder) */}
          <button className="absolute right-1/2 bottom-0 flex h-8 w-8 translate-x-8 translate-y-2 items-center justify-center rounded-full bg-blue-500 shadow-lg transition-colors hover:bg-blue-600">
            <FaCamera className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* User Info */}
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <>
            <h2 className="mb-1 text-2xl font-bold text-gray-900">{name}</h2>
            <p className="mb-3 text-sm text-gray-600">{email}</p>
          </>
        )}

        {/* Rating */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <FaStar className="h-4 w-4 text-yellow-400" />
          <span className="text-lg font-bold text-gray-900">{(stats.avgRating || 0).toFixed(1)}</span>
          <span className="text-sm text-gray-600">rating</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-around border-t border-gray-100 pt-4">
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-blue-600">{stats.orders || 0}</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-green-600">{(stats.avgRating || 0).toFixed(1)}</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-purple-600">{stats.points || 0}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
        </div>
      </div>
    </div>
  );
}
