'use client';

import { sendOTP, verifyOTP } from '@/lib/authService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaArrowLeft, FaShieldHalved } from 'react-icons/fa6';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(''); // For dev testing

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  // Handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 4) {
      setOtp(value);
      setError('');
    }
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await sendOTP(phoneNumber);
      console.log('OTP Response:', response);

      // Store OTP for dev testing (remove in production)
      if (response.otp) {
        setGeneratedOTP(response.otp);
      }

      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(phoneNumber, otp);
      console.log('Verify Response:', response);

      // Backend sets auth cookie (withCredentials). No need to store token in localStorage.
      router.push('/');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  // Change phone number (go back to phone input)
  const handleChangeNumber = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setGeneratedOTP('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header with Logo */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {step === 'otp' && (
            <button
              onClick={handleChangeNumber}
              className="flex items-center gap-2 font-medium text-gray-700 transition-colors duration-200 hover:text-black"
              disabled={loading}
            >
              <FaArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <div className="relative mx-auto w-32">
            <Image
              src="/FulllogoBlack .png"
              alt="Vrober Logo"
              className="h-full w-full"
              width={1573}
              height={512}
            />
          </div>
          {step === 'otp' && <div className="w-16 sm:w-20" />}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 py-12">
        <div className="mx-auto max-w-md">
          {/* Title Section */}
          <div className="animate-slide-in mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-black">
              {step === 'phone' ? 'Welcome to Vrober' : 'Verify your number'}
            </h1>
            <p className="mt-3 text-base text-gray-600">
              {step === 'phone'
                ? 'Login or signup to book premium services at your doorstep'
                : `We've sent a 4-digit OTP to +91 ${phoneNumber}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="animate-slide-in mb-6 flex items-start gap-3 rounded-xl bg-black p-4 text-sm text-white">
              <span className="mt-0.5 text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Dev Testing Info */}
          {generatedOTP && step === 'otp' && (
            <div className="animate-slide-in mb-6 rounded-xl border-2 border-black bg-white p-4 text-sm text-black">
              <strong className="mb-1 block">🔧 Development Mode</strong>
              <p>
                Your OTP is{' '}
                <strong className="ml-2 text-2xl font-bold">
                  {generatedOTP}
                </strong>
              </p>
            </div>
          )}

          {/* Phone Number Form */}
          {step === 'phone' && (
            <form
              onSubmit={handleSendOTP}
              className="animate-fade-in space-y-6"
            >
              <div>
                <label
                  htmlFor="phone"
                  className="mb-3 block text-sm font-semibold tracking-wide text-gray-800"
                >
                  WhatsApp Number
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-base font-bold text-black">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter WhatsApp number"
                    className="w-full rounded-xl border-2 border-gray-300 bg-white py-4 pr-4 pl-16 text-lg font-semibold text-black transition-all duration-200 placeholder:text-gray-400 focus:border-black focus:ring-4 focus:ring-gray-200 focus:outline-none"
                    disabled={loading}
                    autoFocus
                    inputMode="numeric"
                  />
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <FaWhatsapp className="text-lg" /> You will receive an OTP for
                  verification
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10}
                className="w-full rounded-xl bg-black py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl active:scale-98 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 pt-2 text-sm text-gray-500">
                <FaShieldHalved className="text-base text-black" />
                <span>Secure & encrypted login</span>
              </div>
            </form>
          )}

          {/* OTP Form */}
          {step === 'otp' && (
            <form
              onSubmit={handleVerifyOTP}
              className="animate-fade-in space-y-6"
            >
              <div>
                <label
                  htmlFor="otp"
                  className="mb-3 block text-sm font-semibold tracking-wide text-gray-800"
                >
                  Enter OTP
                </label>
                <input
                  type="tel"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="••••"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-5 text-center text-4xl font-bold tracking-[0.5em] text-black transition-all duration-200 focus:border-black focus:ring-4 focus:ring-gray-200 focus:outline-none"
                  disabled={loading}
                  autoFocus
                  inputMode="numeric"
                  maxLength={4}
                />
                <p className="mt-3 text-center text-sm text-gray-600">
                  Enter the 4-digit code sent to your WhatsApp
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 4}
                className="w-full rounded-xl bg-black py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl active:scale-98 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-sm font-semibold text-gray-700 transition-colors duration-200 hover:text-black hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  Didn&apos;t receive OTP?{' '}
                  <span className="font-bold">Resend</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer Text */}
          <div className="mt-10 text-center text-xs text-gray-500">
            By continuing, you agree to Vrober&apos;s{' '}
            <a
              href="/terms"
              className="font-semibold text-black hover:underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/privacy"
              className="font-semibold text-black hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none fixed right-0 bottom-0 left-0 -z-10 h-64 bg-gradient-to-t from-gray-100 via-gray-50 to-transparent opacity-60" />
      <div className="pointer-events-none fixed top-0 right-0 -z-10 h-96 w-96 rounded-full bg-gray-900 opacity-5 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-black opacity-5 blur-3xl" />
    </div>
  );
}
