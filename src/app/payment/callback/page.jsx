'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCircleCheck, FaCircleXmark, FaSpinner, FaTriangleExclamation } from 'react-icons/fa6';
import Link from 'next/link';
import Script from 'next/script';
import api from '@/lib/axios';
import { useCart } from '@/lib/cartContext';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'failed', 'cancelled', 'pending'
  const [message, setMessage] = useState('Verifying your payment...');
  const [orderId, setOrderId] = useState('');
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const orderIdParam = searchParams.get('order_id');
      
      if (!orderIdParam) {
        setStatus('failed');
        setMessage('Invalid payment reference. No order ID found.');
        return;
      }

      setOrderId(orderIdParam);

      try {
        // Verify payment with backend
        const response = await api.post('/payments/verify', { orderId: orderIdParam });
        const paymentData = response.data.data;
        
        if (paymentData.status === 'PAID') {
          setStatus('success');
          setMessage('Payment successful! Your booking is confirmed.');
          clearCart();
          localStorage.removeItem('checkoutCart');
          
          // Redirect to bookings after 3 seconds
          setTimeout(() => {
            router.push('/bookings?success=true');
          }, 3000);
        } else if (paymentData.status === 'CANCELLED' || paymentData.status === 'USER_DROPPED') {
          setStatus('cancelled');
          setMessage('Payment was cancelled. Your booking is saved and you can retry payment.');
        } else if (paymentData.status === 'FAILED') {
          setStatus('failed');
          setMessage('Payment failed. Please try again or use a different payment method.');
        } else {
          // CREATED, ACTIVE, or PENDING status
          setStatus('pending');
          setMessage('Payment is being processed. Please wait or check your bookings.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        // If verification fails, show pending status instead of failed
        setStatus('pending');
        setMessage('Unable to verify payment status. Please check your bookings or contact support.');
      }
    };

    verifyPayment();
  }, [searchParams, router, clearCart]);

  const handleRetryPayment = async () => {
    if (!orderId) {
      router.push('/cart');
      return;
    }

    setRetrying(true);

    try {
      // Get the payment details to retry
      const response = await api.get(`/payments/${orderId}`);
      const payment = response.data.data;
      
      if (payment && payment.bookingIds && payment.bookingIds.length > 0) {
        // Create a new payment order for the same bookings
        const bookingIds = payment.bookingIds.map(b => b._id || b);
        const paymentResponse = await api.post('/payments/create-order', {
          bookingIds: bookingIds,
        });

        const { paymentSessionId } = paymentResponse.data.data;

        if (paymentSessionId && typeof window.Cashfree !== 'undefined') {
          const cashfree = window.Cashfree({
            mode: process.env.NEXT_PUBLIC_CASHFREE_ENV || 'production',
          });

          cashfree.checkout({
            paymentSessionId: paymentSessionId,
            redirectTarget: '_self',
          });
        } else {
          alert('Payment system not ready. Please try from your bookings page.');
          router.push('/bookings');
        }
      } else {
        router.push('/bookings');
      }
    } catch (error) {
      console.error('Retry payment error:', error);
      alert('Unable to retry payment. Please try from your bookings page.');
      router.push('/bookings');
    } finally {
      setRetrying(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        );
      case 'success':
        return (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <FaCircleCheck className="text-4xl text-green-600" />
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
            <FaTriangleExclamation className="text-4xl text-yellow-600" />
          </div>
        );
      case 'pending':
        return (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <FaSpinner className="animate-spin text-4xl text-orange-600" />
          </div>
        );
      default:
        return (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <FaCircleXmark className="text-4xl text-red-600" />
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Processing...';
      case 'success':
        return 'Payment Successful!';
      case 'cancelled':
        return 'Payment Cancelled';
      case 'pending':
        return 'Payment Pending';
      default:
        return 'Payment Failed';
    }
  };

  return (
    <>
      {/* Load Cashfree SDK for retry */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="lazyOnload"
      />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              {getStatusIcon()}
            </div>

            {/* Title */}
            <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
              {getTitle()}
            </h1>

            {/* Message */}
            <p className="mb-6 text-center text-sm text-slate-600">{message}</p>

            {/* Order ID */}
            {orderId && (
              <p className="mb-4 text-center text-xs text-slate-400">
                Order: {orderId}
              </p>
            )}

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

                {status === 'cancelled' && (
                  <>
                    <div className="rounded-lg bg-yellow-50 p-4">
                      <p className="text-sm font-medium text-yellow-800">
                        Payment was cancelled
                      </p>
                      <p className="mt-1 text-xs text-yellow-700">
                        No amount was deducted. You can retry the payment anytime.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRetryPayment}
                        disabled={retrying}
                        className="block w-full rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {retrying ? 'Please wait...' : 'Retry Payment'}
                      </button>
                      <Link
                        href="/bookings"
                        className="block w-full rounded-xl border border-slate-300 bg-white py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        My Bookings
                      </Link>
                    </div>
                  </>
                )}

                {status === 'pending' && (
                  <>
                    <div className="rounded-lg bg-orange-50 p-4">
                      <p className="text-sm font-medium text-orange-800">
                        Payment verification in progress
                      </p>
                      <p className="mt-1 text-xs text-orange-700">
                        This may take a few minutes. Check your bookings for updates.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => window.location.reload()}
                        className="block w-full rounded-xl border border-slate-300 bg-white py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        Refresh Status
                      </button>
                      <Link
                        href="/bookings"
                        className="block w-full rounded-xl bg-slate-900 py-3 text-center font-semibold text-white transition-colors hover:bg-slate-800"
                      >
                        My Bookings
                      </Link>
                    </div>
                  </>
                )}

                {status === 'failed' && (
                  <>
                    <div className="rounded-lg bg-red-50 p-4">
                      <p className="text-sm font-medium text-red-800">
                        Payment could not be processed
                      </p>
                      <p className="mt-1 text-xs text-red-700">
                        If amount was deducted, it will be refunded within 5-7 business days
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleRetryPayment}
                        disabled={retrying}
                        className="block w-full rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {retrying ? 'Please wait...' : 'Try Again'}
                      </button>
                      <Link
                        href="/bookings"
                        className="block w-full rounded-xl border border-slate-300 bg-white py-3 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        My Bookings
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Auto redirect message for success */}
            {status === 'success' && (
              <p className="mt-4 text-center text-xs text-slate-500">
                Redirecting to bookings in a few seconds...
              </p>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              Need help?{' '}
              <Link href="/contact" className="text-emerald-600 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
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
