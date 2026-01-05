'use client';

import { useState } from 'react';
import {
  FiPhone,
  FiClock,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import api from '@/lib/axios';

export default function CallbackPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    note: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (form.phone.trim() && !/^\d{10,}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setStatus(null);

    try {
      await api.post('/callbacks', form);
      setStatus({
        type: 'success',
        message: 'Thank you! Our team will contact you shortly.',
      });
      setForm({ name: '', phone: '', preferredTime: '', note: '' });
      setErrors({});
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err.response?.data?.message ||
          'Failed to submit callback request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <FiPhone className="text-primary-600 h-12 w-12" />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Request a Callback
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            Can&apos;t find what you&apos;re looking for? Our support team is
            ready to help. Submit your details and we&apos;ll reach out to you
            shortly.
          </p>
        </div>

        {/* Info Cards */}
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow">
            <div className="flex-shrink-0">
              <FiClock className="text-primary-600 mt-1 h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quick Response</h3>
              <p className="text-sm text-gray-600">
                We typically respond within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow">
            <div className="flex-shrink-0">
              <FiMessageSquare className="text-primary-600 mt-1 h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Always Available</h3>
              <p className="text-sm text-gray-600">Submit anytime, anywhere</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="from-primary-600 to-primary-700 bg-gradient-to-r px-8 py-6">
            <h2 className="text-xl font-semibold text-white">
              Your Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            {/* Success Message */}
            {status?.type === 'success' && (
              <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">
                    {status.message}
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    We&apos;ll reach out to the provided phone number.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status?.type === 'error' && (
              <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <FiAlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="mt-1 text-sm text-red-700">{status.message}</p>
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border-2 px-4 py-3 transition focus:outline-none ${
                  errors.name
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'focus:border-primary-500 focus:bg-primary-50 border-gray-200'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full rounded-lg border-2 px-4 py-3 transition focus:outline-none ${
                  errors.phone
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'focus:border-primary-500 focus:bg-primary-50 border-gray-200'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Preferred Time Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Preferred Time to Call (Optional)
              </label>
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={handleChange}
                className="focus:border-primary-500 focus:bg-primary-50 w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition focus:outline-none"
              >
                <option value="">Select a time slot</option>
                <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
                <option value="12:00-15:00">12:00 PM - 3:00 PM</option>
                <option value="15:00-18:00">3:00 PM - 6:00 PM</option>
                <option value="18:00-21:00">6:00 PM - 9:00 PM</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>

            {/* Note Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Message (Optional)
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Tell us what you need. We're here to help!"
                rows="4"
                className="focus:border-primary-500 focus:bg-primary-50 w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 transition focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                {form.note.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r py-3 font-semibold text-white transition duration-200 disabled:from-gray-400 disabled:to-gray-500"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiPhone className="h-5 w-5" />
                  Request Callback
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Your information is safe with us. We&apos;ll never share it with
            third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
