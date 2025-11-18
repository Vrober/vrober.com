'use client';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import api from '@/lib/axios';

export default function RecentBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get('/bookings/user', { params: { limit: 5 } })
      .then((res) => {
        if (!active) return;
        setBookings(res.data.bookings || []);
      })
      .catch((err) => {
        if (!active) return;
        const status = err.response?.status;
        if (status === 401) {
          setError('Please sign in to view your recent bookings.');
        } else {
          setError(
            err.response?.data?.message || 'Failed to load recent bookings'
          );
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const formatDateTime = (serviceDate, serviceTime) => {
    if (!serviceDate && !serviceTime) return 'N/A';
    try {
      const dateObj = serviceDate ? new Date(serviceDate) : null;
      const dateStr = dateObj
        ? dateObj.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })
        : '';
      return `${dateStr} ${serviceTime || ''}`.trim();
    } catch {
      return serviceDate || serviceTime || 'N/A';
    }
  };

  const statusStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          label: 'Completed',
        };
      case 'accepted':
        return { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Upcoming' };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          label: 'Pending',
        };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-600', label: 'Cancelled' };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-600', label: 'Rejected' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
    }
  };

  const actionFor = (status) => {
    switch (status) {
      case 'completed':
        return 'Book Again';
      case 'cancelled':
      case 'rejected':
        return 'Rebook';
      case 'pending':
        return 'Cancel';
      case 'accepted':
        return 'Details';
      default:
        return 'View';
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">
          {Number(rating).toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>
      {loading && <p className="text-sm text-zinc-500">Loading bookings...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="space-y-3">
        {!loading && !error && bookings.length === 0 && (
          <p className="text-sm text-zinc-500">No bookings yet.</p>
        )}
        {bookings.map((b) => {
          const styles = statusStyles(b.status);
          return (
            <div
              key={b._id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start space-x-3">
                {/* Simple leading badge using first letter */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black font-semibold text-white">
                  {b.serviceId?.serviceName?.substring(0, 1) || 'S'}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-base font-bold text-gray-900">
                        {b.serviceId?.serviceName || 'Service'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {b.vendorId?.name || 'Vendor'}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 ${styles.bg} ${styles.text} rounded-full text-sm font-medium`}
                    >
                      {styles.label}
                    </span>
                  </div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {formatDateTime(b.serviceDate, b.serviceTime)}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹ {b.price || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="text-sm font-medium text-blue-600 hover:underline">
                      {actionFor(b.status)}
                    </button>
                    {renderStars(b.rating)}
                  </div>
                  {b.status === 'cancelled' && b.cancellationReason && (
                    <div className="mt-2 border-t border-gray-100 pt-2">
                      <span className="text-xs text-gray-500">
                        Cancelled: {b.cancellationReason}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
