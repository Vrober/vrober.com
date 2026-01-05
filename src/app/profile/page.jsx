'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapPin,
  FaBirthdayCake,
  FaVenusMars,
  FaPencil,
  FaArrowRightFromBracket,
  FaHeadset,
  FaClock,
  FaGear,
  FaShield,
  FaFile,
  FaBell,
  FaCircleQuestion,
  FaArrowRight,
  FaCheckCircle,
  FaX,
  FaPhone as FaPhoneIcon,
  FaHeart,
} from 'react-icons/fa6';
import api from '@/lib/axios';
import ProtectedRoute from '../_components/ProtectedRoute';

function ProfilePageContent() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackReason, setCallbackReason] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    pinCode: '',
    dob: '',
    gender: '',
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        const userData = response.data.data;
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          mobileNo: userData.mobileNo || '',
          address: userData.address || '',
          pinCode: userData.pinCode || '',
          dob: userData.dob ? userData.dob.split('T')[0] : '',
          gender: userData.gender || '',
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setSubmitting(true);
    setMessage('');
    try {
      const response = await api.put('/auth/update-profile', formData);
      if (response.data.success) {
        setUser(response.data.data);
        setEditing(false);
        setMessage('✓ Profile updated successfully');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage(
        '✗ Failed to update profile: ' +
          (err.response?.data?.message || 'Unknown error')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCallback = async () => {
    if (!callbackReason.trim() || !callbackPhone.trim()) {
      setMessage('✗ Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setMessage('');
    try {
      const response = await api.post('/callbacks', {
        phoneNumber: callbackPhone,
        reason: callbackReason,
        userId: user.id,
      });
      if (response.data.success) {
        setShowCallbackModal(false);
        setCallbackReason('');
        setCallbackPhone('');
        setMessage("✓ Callback request submitted. We'll contact you soon!");
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage(
        '✗ Failed to submit callback: ' +
          (err.response?.data?.message || 'Unknown error')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => router.back()} className="-ml-2 p-2">
            <FaArrowLeft className="text-slate-900" />
          </button>
          <h1 className="mt-2 text-xl font-bold text-slate-900">My Profile</h1>
        </div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin text-4xl">⟳</div>
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
          <h1 className="text-lg font-bold text-slate-900">My Profile</h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden border-b border-slate-200 bg-white px-10 py-8 lg:block">
        <h1 className="text-4xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-2 text-slate-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-6 pb-20 lg:py-8">
        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 rounded-xl border-l-4 p-4 ${
              message.startsWith('✓')
                ? 'border-green-500 bg-green-50 text-green-900'
                : 'border-red-500 bg-red-50 text-red-900'
            }`}
          >
            <p className="text-sm font-semibold">{message}</p>
          </div>
        )}

        {/* Profile Card - View Mode */}
        {!editing && user && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:mb-8">
            {/* Card Header with Edit Button */}
            <div className="flex items-start justify-between bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {user.name || 'User'}
                </h2>
                <p className="mt-2 text-emerald-50">{user.mobileNo}</p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-emerald-600 transition hover:bg-slate-100"
              >
                <FaPencil className="text-sm" />
                Edit
              </button>
            </div>

            {/* Profile Details */}
            <div className="space-y-6 px-6 py-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Email */}
                <div className="flex gap-4">
                  <FaEnvelope className="mt-1 flex-shrink-0 text-lg text-emerald-600" />
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Email Address
                    </p>
                    <p className="font-medium break-all text-slate-900">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <FaPhone className="mt-1 flex-shrink-0 text-lg text-emerald-600" />
                  <div>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Phone Number
                    </p>
                    <p className="font-medium text-slate-900">
                      {user.mobileNo}
                    </p>
                  </div>
                </div>

                {/* Address */}
                {user.address && (
                  <div className="flex gap-4 md:col-span-2">
                    <FaMapPin className="mt-1 flex-shrink-0 text-lg text-emerald-600" />
                    <div className="flex-1">
                      <p className="mb-1 text-xs font-semibold text-slate-600">
                        Address
                      </p>
                      <p className="font-medium text-slate-900">
                        {user.address}
                      </p>
                      {user.pinCode && (
                        <p className="mt-1 text-sm text-slate-600">
                          Pin Code: {user.pinCode}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* DOB */}
                {user.dob && (
                  <div className="flex gap-4">
                    <FaBirthdayCake className="mt-1 flex-shrink-0 text-lg text-emerald-600" />
                    <div>
                      <p className="mb-1 text-xs font-semibold text-slate-600">
                        Date of Birth
                      </p>
                      <p className="font-medium text-slate-900">
                        {new Date(user.dob).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Gender */}
                {user.gender && (
                  <div className="flex gap-4">
                    <FaVenusMars className="mt-1 flex-shrink-0 text-lg text-emerald-600" />
                    <div>
                      <p className="mb-1 text-xs font-semibold text-slate-600">
                        Gender
                      </p>
                      <p className="font-medium text-slate-900 capitalize">
                        {user.gender}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {editing && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:mb-8">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
              <button
                onClick={() => setEditing(false)}
                className="rounded-lg p-2 transition hover:bg-slate-200"
              >
                <FaX className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone (Disabled) */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Phone Number (Cannot Change)
                </label>
                <input
                  type="tel"
                  value={formData.mobileNo}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  placeholder="Your full address"
                  rows={3}
                />
              </div>

              {/* Pin Code */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  placeholder="e.g., 814114"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-slate-200 pt-4">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-6 space-y-3">
          {/* Callback Button */}
          <button
            onClick={() => setShowCallbackModal(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <FaPhoneIcon className="text-lg text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Request Callback</p>
                <p className="text-xs text-slate-600">
                  Our team will contact you
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Bookings */}
          <button
            onClick={() => router.push('/bookings')}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-emerald-50 p-3">
                <FaClock className="text-lg text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">My Bookings</p>
                <p className="text-xs text-slate-600">
                  View all your service bookings
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Addresses */}
          <button
            onClick={() => router.push('/profile/addresses')}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-50 p-3">
                <FaMapPin className="text-lg text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Saved Addresses</p>
                <p className="text-xs text-slate-600">
                  Manage your service locations
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Favorites */}
          <button
            onClick={() => router.push('/profile/favorites')}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-pink-50 p-3">
                <FaHeart className="text-lg text-pink-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">
                  Favorite Services
                </p>
                <p className="text-xs text-slate-600">
                  Your favorite professionals
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Payment Methods */}
          <button
            onClick={() => router.push('/profile/payment')}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-50 p-3">
                <FaGear className="text-lg text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Payment Methods</p>
                <p className="text-xs text-slate-600">
                  Manage your payment options
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>
        </div>

        {/* Settings & Support */}
        <div className="mb-6 space-y-3">
          {/* Notifications */}
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-yellow-50 p-3">
                <FaBell className="text-lg text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Notifications</p>
                <p className="text-xs text-slate-600">
                  Manage notification settings
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Help & Support */}
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-cyan-50 p-3">
                <FaHeadset className="text-lg text-cyan-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Help & Support</p>
                <p className="text-xs text-slate-600">
                  FAQs and contact support
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Privacy & Security */}
          <button
            onClick={() => router.push('/profile/privacy')}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-50 p-3">
                <FaShield className="text-lg text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">
                  Privacy & Security
                </p>
                <p className="text-xs text-slate-600">
                  Manage privacy settings
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>

          {/* Terms */}
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-indigo-50 p-3">
                <FaFile className="text-lg text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Terms & Policies</p>
                <p className="text-xs text-slate-600">
                  View our terms and policies
                </p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 transition hover:bg-red-100"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-100 p-3">
              <FaArrowRightFromBracket className="text-lg text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-red-900">Logout</p>
              <p className="text-xs text-red-700">Sign out from your account</p>
            </div>
          </div>
          <FaArrowRight className="text-red-400" />
        </button>
      </div>

      {/* Callback Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white">
            {/* Modal Header */}
            <div className="flex items-start gap-3 border-b border-blue-200 bg-blue-50 px-6 py-4">
              <FaPhoneIcon className="mt-0.5 flex-shrink-0 text-xl text-blue-600" />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">
                  Request a Callback
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Our support team will contact you within 24 hours
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 px-6 py-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={callbackPhone || user?.mobileNo || ''}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="10-digit phone number"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  Reason for Callback
                </label>
                <textarea
                  value={callbackReason}
                  onChange={(e) => setCallbackReason(e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  rows={4}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={() => setShowCallbackModal(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCallback}
                disabled={submitting}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Request Callback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
