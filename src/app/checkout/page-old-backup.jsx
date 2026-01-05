'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaCircleCheck,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaCalendar,
  FaClock,
} from 'react-icons/fa6';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import { useCart } from '@/lib/cartContext';
import api from '@/lib/axios';

function CheckoutPageContent() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    date: '',
    time: '',
    notes: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await api.get('/auth/me');
        const user = response.data.user;

        setFormData((prev) => ({
          ...prev,
          name: user.name || '',
          phone: user.mobileNo || user.phone || '',
          address: user.address || '',
          city: user.city || '',
          pincode: user.pinCode || user.pincode || '',
        }));
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (
        !formData.name.trim() ||
        !formData.phone.trim() ||
        !formData.address.trim() ||
        !formData.date ||
        !formData.time
      ) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Validate phone number
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
      }

      // Create booking for each service in cart
      const bookingPromises = cart.map((item) =>
        api.post('/bookings', {
          serviceId: item._id,
          serviceDate: formData.date,
          serviceTime: formData.time,
          address: formData.address,
          location: formData.city ? `${formData.city}${formData.pincode ? ', ' + formData.pincode : ''}` : undefined,
          price: item.price * (item.quantity || 1),
          description: `${item.serviceName || item.name} (Qty: ${item.quantity || 1})`,
          specialInstructions: formData.notes || undefined,
          paymentMethod: 'cash',
        })
      );

      await Promise.all(bookingPromises);

      // Clear cart on success
      clearCart();
      localStorage.removeItem('checkoutCart');

      // Redirect to bookings page
      router.push('/bookings?success=true');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(
        err.response?.data?.message ||
          'Failed to create booking. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }

  const bookingFee = 20;
  const subtotal = getTotalPrice();
  const total = subtotal + bookingFee;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="-ml-2 rounded-lg p-2 transition-colors hover:bg-slate-100"
          >
            <FaArrowLeft className="text-slate-900" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Checkout</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Desktop Back Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                <FaArrowLeft className="text-xs" />
                Back to cart
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            {/* Contact Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Contact details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      <FaUser className="mr-2 inline text-xs" />
                      Full name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      <FaPhone className="mr-2 inline text-xs" />
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
              </div>

              {/* Service Location */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Service location
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      <FaLocationDot className="mr-2 inline text-xs" />
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                      placeholder="House no., Street, Area"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pincode"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        pattern="[0-9]{6}"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                        placeholder="6-digit pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Schedule service
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      <FaCalendar className="mr-2 inline text-xs" />
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={today}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      <FaClock className="mr-2 inline text-xs" />
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    >
                      <option value="">Select time</option>
                      <option value="08:00-10:00">08:00 - 10:00 AM</option>
                      <option value="10:00-12:00">10:00 - 12:00 PM</option>
                      <option value="12:00-14:00">12:00 - 02:00 PM</option>
                      <option value="14:00-16:00">02:00 - 04:00 PM</option>
                      <option value="16:00-18:00">04:00 - 06:00 PM</option>
                      <option value="18:00-20:00">06:00 - 08:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Additional notes (Optional)
                </h2>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  placeholder="Any specific requirements or instructions..."
                />
              </div>

              {/* Mobile Submit Button */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCircleCheck className="text-xs" />
                      Confirm booking (₹{total})
                    </>
                  )}
                </button>
              </div>
            </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Order summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={item.image || '/placeholder.png'}
                        alt={item.serviceName || item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {item.serviceName || item.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity || 1}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        ₹{item.price * (item.quantity || 1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Booking fee</span>
                  <span className="font-semibold text-slate-900">
                    ₹{bookingFee}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3">
                  <span className="text-base font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="hidden w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCircleCheck className="text-xs" />
                    Confirm booking
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutPageContent />
    </ProtectedRoute>
  );
}
