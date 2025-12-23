'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus, FaArrowRight, FaCircleCheck } from 'react-icons/fa6';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import { useCart } from '@/lib/cartContext';

function CartPageContent() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
        <div className="space-y-6 text-center max-w-sm">
          <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🛒</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
            <p className="text-sm text-slate-600">
              Add services to your cart and book them together.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow transition-colors hover:bg-slate-800 w-full"
          >
            <FaArrowLeft className="text-xs" />
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Store cart details in session/localStorage for checkout
      localStorage.setItem('checkoutCart', JSON.stringify(cart));
      router.push('/checkout');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32 lg:pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 flex lg:hidden items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-lg hover:bg-slate-100 p-2"
        >
          <FaArrowLeft className="text-lg text-slate-900" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 flex-1">Cart</h1>
        <span className="inline-flex items-center justify-center rounded-full bg-slate-900 w-8 h-8 text-white text-xs font-bold">
          {totalItems}
        </span>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 lg:px-10 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Cart Items */}
          <div className="space-y-3">
            <div className="hidden lg:block mb-6">
              <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
              <p className="text-sm text-slate-600 mt-1">{totalItems} service(s) in cart</p>
            </div>

            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onQuantityChange={(qty) => updateQuantity(item._id, qty)}
                onRemove={() => removeFromCart(item._id)}
              />
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="fixed bottom-0 left-0 right-0 lg:relative bg-white border-t lg:border lg:border-slate-200 lg:rounded-2xl p-4 space-y-4 shadow-lg lg:shadow-sm lg:p-6">
            <div className="space-y-3">
              <h2 className="hidden lg:block text-lg font-bold text-slate-900">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-700">
                  <span>{totalItems} service(s)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Booking fee</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="hidden lg:block border-t border-slate-200" />

              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 lg:mt-6">
              <button
                onClick={handleCheckout}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow transition-colors hover:bg-slate-800 active:scale-95"
              >
                <FaCircleCheck className="text-xs" />
                Proceed to checkout
              </button>
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow transition-colors hover:bg-slate-50"
              >
                <FaArrowLeft className="text-xs" />
                Continue shopping
              </Link>
            </div>

            <button
              onClick={clearCart}
              className="hidden lg:block w-full py-2 text-center text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 lg:p-4 shadow-sm transition-all hover:shadow">
      {/* Image */}
      <Link href={`/services/${item._id}`} className="shrink-0">
        <div className="h-20 w-20 lg:h-24 lg:w-24 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
          <Image
            src={item.imageUrl || '/assets/placeholder.png'}
            alt={item.serviceName}
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-2">
        <Link href={`/services/${item._id}`}>
          <h3 className="font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 transition-colors">
            {item.serviceName}
          </h3>
        </Link>
        <p className="text-xs lg:text-sm text-slate-600 line-clamp-1">
          {item.description || 'Professional service'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">₹{item.price || 0}</span>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              className="flex items-center justify-center rounded px-2 py-1 hover:bg-slate-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <FaMinus className="text-xs text-slate-700" />
            </button>
            <span className="w-6 text-center text-sm font-bold text-slate-900">
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="flex items-center justify-center rounded px-2 py-1 hover:bg-slate-200 transition-colors"
              aria-label="Increase quantity"
            >
              <FaPlus className="text-xs text-slate-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="shrink-0 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 p-2 transition-colors"
        aria-label="Remove from cart"
      >
        <FaTrash className="text-sm" />
      </button>
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartPageContent />
    </ProtectedRoute>
  );
}
