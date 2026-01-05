'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCircleCheck, FaCircleXmark, FaSpinner } from 'react-icons/fa6';
import Link from 'next/link';
import api from '@/lib/axios';
import { useCart } from '@/lib/cartContext';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'failed'
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get('order_id');
      
      if (!orderId) {
        setStatus('failed');
        setMessage('Invalid payment reference');
        return;
      }

      try {
        // Verify payment with backend
        const response = await api.post('/payments/verify', { orderId });
        
        if (response.data.data.status === 'PAID') {
          setStatus('success');
          setMessage('Payment successful! Your booking is confirmed.');
          clearCart();
          
          // Redirect to bookings after 3 seconds
          setTimeout(() => {
            router.push('/bookings?success=true');
          }, 3000);
        } else {
          setStatus('failed');
          setMessage('Payment verification pending. Please check your bookings.');
          
          setTimeout(() => {
            router.push('/bookings');
          }, 3000);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Payment verification failed. Please contact support if amount was deducted.');
      }
    };

    verifyPayment();
  }, [searchParams, router, clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            {status === 'loading' && (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
              </div>
            )}
            {status === 'success' && (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <FaCircleCheck className="text-4xl text-green-600" />
              </div>
            )}
            {status === 'failed' && (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <FaCircleXmark className="text-4xl text-red-600" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
            {status === 'loading' && 'Processing...'}
            {status === 'success' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
          </h1>

          {/* Message */}
          <p className="mb-6 text-center text-sm text-slate-600">{message}</p>

          {/* Status Details */}
          {status !== 'loading' && (
            <div className="space-y-3">
              {status === 'success' && (
                <>
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-800">
                      ✓ Your booking has been confirmed
                    </p>
                    <p className="mt-1 text-xs text-green-700">
                      You will receive booking details shortly
                    </p>
                  </div>
                  <Link
                    href="/bookings"
                    className="block w-full rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    View My Bookings
                  </Link>
                </>
              )}

              {status === 'failed' && (
                <>
                  <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-800">
                      Payment could not be processed
                    </p>
                    <p className="mt-1 text-xs text-red-700">
                      If amount was deducted, it will be refunded within 5-7
                      business days
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href="/cart"
                      className="block w-full rounded-xl border border-slate-300 bg-white py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Try Again
                    </Link>
                    <Link
                      href="/bookings"
                      className="block w-full rounded-xl bg-slate-900 py-3 text-center font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                      My Bookings
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Auto redirect message */}
          {status !== 'loading' && (
            <p className="mt-4 text-center text-xs text-slate-500">
              Redirecting to bookings in a few seconds...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-slate-600" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
