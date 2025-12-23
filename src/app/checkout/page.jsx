'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCircleCheck, FaLocationDot, FaPhone, FaUser, FaCalendar, FaClock } from 'react-icons/fa6';
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
        
        setFormData(prev => ({
          ...prev,
          name: user.name || '',
          phone: user.phone || '',
        }));
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.name || !formData.phone || !formData.address || !formData.date || !formData.time) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create booking for each service in cart
      const bookingPromises = cart.map(item => 
        api.post('/bookings', {
          serviceId: item._id,
          serviceName: item.serviceName || item.name,
          date: formData.date,
          time: formData.time,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          notes: formData.notes,
          price: item.price,
          quantity: item.quantity || 1,
        })
      );

      await Promise.all(bookingPromises);

      // Clear cart on success
      clearCart();

      // Redirect to bookings page
      router.push('/bookings?success=true');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
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
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <FaArrowLeft className="text-slate-900" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Checkout</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Desktop Back Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                Back to cart
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Contact details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      <FaUser className="inline text-xs mr-2" />
                      Full name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      <FaPhone className="inline text-xs mr-2" />
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
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
              </div>

              {/* Service Location */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Service location</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                      <FaLocationDot className="inline text-xs mr-2" />
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                      placeholder="House no., Street, Area"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-slate-700 mb-2">
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        pattern="[0-9]{6}"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="6-digit pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Schedule service</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
                      <FaCalendar className="inline text-xs mr-2" />
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
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
                      <FaClock className="inline text-xs mr-2" />
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Additional notes (Optional)</h2>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                  placeholder="Any specific requirements or instructions..."
                />
              </div>

              {/* Mobile Submit Button */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Order summary</h2>

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
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 truncate">
                        {item.serviceName || item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Qty: {item.quantity || 1}
                      </p>
                      <p className="text-sm font-bold text-slate-900 mt-1">
                        ₹{item.price * (item.quantity || 1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Booking fee</span>
                  <span className="font-semibold text-slate-900">₹{bookingFee}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-slate-900">₹{total}</span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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

              <p className="text-xs text-slate-500 text-center">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
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
