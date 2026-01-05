'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaMapPin,
  FaUser,
  FaPhone,
  FaStar,
  FaXmark,
  FaTriangleExclamation,
  FaRepeat,
  FaComments,
  FaArrowRight,
  FaCircleCheck,
  FaHourglass,
  FaCheckCircle,
} from 'react-icons/fa6';
import { fetchUserBookings, cancelBooking } from '@/lib/bookingService';
import ProtectedRoute from '@/app/_components/ProtectedRoute';

function BookingsPageContent() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchUserBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancelClick = (bookingId) => {
    setShowCancelModal(bookingId);
    setCancellationReason('');
  };

  const handleConfirmCancel = async () => {
    if (!showCancelModal) return;

    setCancellingId(showCancelModal);
    try {
      await cancelBooking(showCancelModal, cancellationReason);
      setShowCancelModal(null);
      setCancellationReason('');
      await loadBookings();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to cancel booking');
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      unassigned: {
        label: 'Finding Professional',
        icon: <FaHourglass className="text-amber-500" />,
        color: 'bg-amber-50 border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
        description: "We're searching for the right professional for you",
      },
      assigned: {
        label: 'Professional Assigned',
        icon: <FaUser className="text-blue-500" />,
        color: 'bg-blue-50 border-blue-200',
        badge: 'bg-blue-100 text-blue-800',
        description: 'Professional assigned, awaiting confirmation',
      },
      accepted: {
        label: 'Confirmed',
        icon: <FaCheckCircle className="text-emerald-500" />,
        color: 'bg-emerald-50 border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800',
        description: 'Professional has confirmed and will arrive soon',
      },
      'in-progress': {
        label: 'In Progress',
        icon: <FaCheckCircle className="text-purple-500" />,
        color: 'bg-purple-50 border-purple-200',
        badge: 'bg-purple-100 text-purple-800',
        description: 'Service is currently in progress',
      },
      completed: {
        label: 'Completed',
        icon: <FaCircleCheck className="text-green-500" />,
        color: 'bg-green-50 border-green-200',
        badge: 'bg-green-100 text-green-800',
        description: 'Service completed successfully',
      },
      cancelled: {
        label: 'Cancelled',
        icon: <FaXmark className="text-red-500" />,
        color: 'bg-red-50 border-red-200',
        badge: 'bg-red-100 text-red-800',
        description: 'Booking has been cancelled',
      },
    };
    return statusMap[status] || statusMap['unassigned'];
  };

  const canCancel = (booking) => {
    return ['unassigned', 'assigned', 'accepted'].includes(booking.status);
  };

  const canReschedule = (booking) => {
    const bookingDate = new Date(booking.date);
    const now = new Date();
    const hoursUntilService = (bookingDate - now) / (1000 * 60 * 60);
    return (
      hoursUntilService > 2 && ['assigned', 'accepted'].includes(booking.status)
    );
  };

  const canReview = (booking) => {
    return booking.status === 'completed' && !booking.review;
  };

  // Mobile Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => router.back()} className="-ml-2 p-2">
            <FaArrowLeft className="text-slate-900" />
          </button>
          <h1 className="mt-2 text-xl font-bold text-slate-900">My Bookings</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden border-b border-slate-200 bg-white px-10 py-8 lg:block">
          <h1 className="text-4xl font-bold text-slate-900">My Bookings</h1>
          <p className="mt-2 text-slate-600">
            Track and manage all your service bookings
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="mb-4 h-40 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="-ml-2 rounded-lg p-2 transition hover:bg-slate-100"
          >
            <FaArrowLeft className="text-slate-900" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">My Bookings</h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden border-b border-slate-200 bg-white px-10 py-8 lg:block">
        <h1 className="text-4xl font-bold text-slate-900">My Bookings</h1>
        <p className="mt-2 text-slate-600">
          Track and manage all your service bookings in one place
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 pb-20 lg:py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <FaTriangleExclamation className="mt-0.5 flex-shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-900">{error}</p>
              <button
                onClick={() => setError('')}
                className="mt-1 text-xs text-red-700 underline hover:text-red-900"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* No Bookings State */}
        {bookings.length === 0 ? (
          <div className="py-12 text-center lg:py-20">
            <div className="mb-6 text-6xl">📦</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              No bookings yet
            </h2>
            <p className="mb-6 text-slate-600">
              Start by booking a service and it will appear here
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Browse Services
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 lg:space-y-6">
            {bookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);
              const bookingDate = new Date(booking.date);
              const isUpcoming =
                bookingDate > new Date() &&
                !['completed', 'cancelled'].includes(booking.status);

              return (
                <div
                  key={booking.id}
                  className={`overflow-hidden rounded-2xl border-2 transition-all lg:hover:shadow-lg ${statusInfo.color}`}
                >
                  {/* Card Header - Status Bar */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 lg:px-6">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex-shrink-0 text-2xl">
                        {statusInfo.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 lg:text-base">
                          {statusInfo.label}
                        </p>
                        <p className="text-xs text-slate-600">
                          {statusInfo.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusInfo.badge}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="bg-white px-4 py-6 lg:px-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Left - Service Info */}
                      <div className="space-y-5 lg:col-span-2">
                        {/* Service Name and Price */}
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">
                            {booking.serviceName}
                          </h3>
                          <p className="mt-2 text-lg font-bold text-emerald-600">
                            ₹{booking.price}
                          </p>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex gap-3">
                            <FaCalendar className="mt-1 flex-shrink-0 text-sm text-slate-600" />
                            <div>
                              <p className="text-xs font-semibold text-slate-600">
                                Date
                              </p>
                              <p className="font-bold text-slate-900">
                                {new Date(booking.date).toLocaleDateString(
                                  'en-IN',
                                  {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <FaClock className="mt-1 flex-shrink-0 text-sm text-slate-600" />
                            <div>
                              <p className="text-xs font-semibold text-slate-600">
                                Time
                              </p>
                              <p className="font-bold text-slate-900">
                                {booking.time}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex gap-3">
                          <FaMapPin className="mt-1 flex-shrink-0 text-sm text-slate-600" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-600">
                              Service Location
                            </p>
                            <p className="text-sm leading-relaxed text-slate-900">
                              {booking.address}
                            </p>
                          </div>
                        </div>

                        {/* Professional Info */}
                        {booking.vendorName && (
                          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1">
                                <p className="mb-1 text-xs font-semibold text-slate-600">
                                  Professional
                                </p>
                                <p className="font-bold text-slate-900">
                                  {booking.vendorName}
                                </p>
                                {booking.rating && (
                                  <div className="mt-2 flex items-center gap-1">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <FaStar
                                          key={i}
                                          className={`text-xs ${i < Math.floor(booking.rating) ? 'text-amber-500' : 'text-slate-300'}`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600">
                                      {booking.rating.toFixed(1)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <button className="flex-shrink-0 rounded-lg border border-slate-200 bg-white p-3 transition hover:bg-slate-50">
                                <FaPhone className="text-emerald-600" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right - Actions */}
                      <div className="space-y-3 lg:col-span-1">
                        {/* Booking ID */}
                        <div className="rounded-xl bg-slate-100 p-4">
                          <p className="mb-1 text-xs font-semibold text-slate-600">
                            Booking ID
                          </p>
                          <p className="font-mono text-sm break-all text-slate-900">
                            {booking.id?.slice(0, 12)}...
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          {isUpcoming && (
                            <>
                              {canReschedule(booking) && (
                                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50">
                                  <FaRepeat className="text-sm" />
                                  Reschedule
                                </button>
                              )}
                              {canCancel(booking) && (
                                <button
                                  onClick={() => handleCancelClick(booking.id)}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                  <FaXmark className="text-sm" />
                                  Cancel Booking
                                </button>
                              )}
                            </>
                          )}

                          {canReview(booking) && (
                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                              <FaStar className="text-sm" />
                              Write Review
                            </button>
                          )}

                          {booking.status === 'completed' && booking.review && (
                            <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                              <p className="text-xs font-bold text-green-800">
                                ✓ Review submitted
                              </p>
                            </div>
                          )}

                          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                            <FaComments className="text-sm" />
                            Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white">
            {/* Modal Header */}
            <div className="flex items-start gap-3 border-b border-red-200 bg-red-50 px-6 py-4">
              <FaTriangleExclamation className="mt-0.5 flex-shrink-0 text-xl text-red-600" />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">
                  Cancel Booking?
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  This action cannot be undone. You may be charged a
                  cancellation fee.
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 px-6 py-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Reason for cancellation (optional)
                </label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="Help us improve by telling us why..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={() => setShowCancelModal(null)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={cancellingId === showCancelModal}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {cancellingId === showCancelModal
                  ? 'Cancelling...'
                  : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap with ProtectedRoute
export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <BookingsPageContent />
    </ProtectedRoute>
  );
}
