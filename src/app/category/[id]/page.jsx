'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaStar,
  FaCartPlus,
  FaCircleCheck,
  FaClock,
  FaFire,
  FaCartShopping,
} from 'react-icons/fa6';
import api from '@/lib/axios';
import { useCart } from '@/lib/cartContext';

export default function CategoryService() {
  const params = useParams();
  const router = useRouter();
  const categoryParam = params.id;
  const { addToCart, cart, getTotalItems } = useCart();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());

  useEffect(() => {
    if (!categoryParam) return;
    let active = true;
    setLoading(true);
    setError(null);
    const params = { limit: 50 };
    if (categoryParam !== 'all') params.category = categoryParam;
    api
      .get('/services', { params })
      .then((res) => {
        if (active) setServices(res.data.services || []);
      })
      .catch((err) => {
        if (active)
          setError(err.response?.data?.message || 'Failed to load services');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [categoryParam]);

  const handleAddToCart = (service) => {
    addToCart({
      _id: service._id,
      name: service.serviceName,
      serviceName: service.serviceName,
      price: service.price,
      image: service.imageUrl,
      quantity: 1,
    });
    
    setAddedItems((prev) => new Set(prev).add(service._id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(service._id);
        return next;
      });
    }, 2000);
  };

  const isInCart = (serviceId) => {
    return cart.some((item) => item._id === serviceId);
  };
  const categoryTitle =
    categoryParam === 'all'
      ? 'All Services'
      : services[0]?.category || decodeURIComponent(categoryParam);

  const totalItems = getTotalItems();
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-100"
            >
              <FaArrowLeft className="text-slate-900" />
            </button>
            <div>
              <h1 className="text-lg font-bold capitalize text-slate-900 lg:text-xl">
                {categoryTitle || 'Services'}
              </h1>
              <p className="text-xs text-slate-500 lg:text-sm">
                {services.length} service{services.length !== 1 ? 's' : ''}{' '}
                available
              </p>
            </div>
          </div>
          
          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-100"
          >
            <FaCartShopping className="text-lg text-slate-900" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
        {loading && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex gap-4">
                  <div className="h-24 w-24 rounded-xl bg-slate-200"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                    <div className="h-3 w-full rounded bg-slate-200"></div>
                    <div className="h-3 w-2/3 rounded bg-slate-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              No services found
            </h3>
            <p className="mb-6 text-sm text-slate-600">
              No services available in this category at the moment.
            </p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              Go back
            </button>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((svc) => {
            const inCart = isInCart(svc._id);
            const justAdded = addedItems.has(svc._id);
            
            return (
              <div
                key={svc._id}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md lg:p-5"
              >
                <div className="flex gap-4">
                  {/* Service Image */}
                  <Link
                    href={`/services/${svc._id}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 lg:h-28 lg:w-28"
                  >
                    <Image
                      src={svc.imageUrl || '/placeholder.png'}
                      alt={svc.serviceName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {svc.isPopular && (
                      <div className="absolute right-1 top-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                        <FaFire className="inline" />
                      </div>
                    )}
                  </Link>

                  {/* Service Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/services/${svc._id}`}>
                      <h2 className="mb-1 line-clamp-1 text-base font-bold capitalize text-slate-900 transition-colors hover:text-emerald-600 lg:text-lg">
                        {svc.serviceName}
                      </h2>
                    </Link>
                    
                    <p className="mb-2 line-clamp-2 text-xs text-slate-600 lg:text-sm">
                      {svc.description || 'Professional service at your doorstep'}
                    </p>

                    {/* Meta Info */}
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="font-semibold text-slate-900">
                          {svc.rating?.toFixed?.(1) || '4.5'}
                        </span>
                      </div>
                      {svc.duration && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <FaClock className="text-xs" />
                          <span>{svc.duration}</span>
                        </div>
                      )}
                      <span className="text-base font-bold text-slate-900 lg:text-lg">
                        ₹{svc.price || 0}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2">
                      {inCart || justAdded ? (
                        <Link
                          href="/cart"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                        >
                          <FaCircleCheck className="text-xs" />
                          View Cart
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(svc)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
                        >
                          <FaCartPlus className="text-xs" />
                          Add to Cart
                        </button>
                      )}
                      
                      <Link
                        href={`/services/${svc._id}`}
                        className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
