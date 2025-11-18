'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * BookNowButton Component
 * Reusable button that redirects to the booking page with pre-selected service
 *
 * Usage:
 * <BookNowButton serviceId={1} />
 * <BookNowButton serviceId={2} label="Book AC Service" />
 * <BookNowButton serviceId={3} className="custom-class" />
 */

export default function BookNowButton({
  serviceId,
  label = 'Book Now',
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'outline'
}) {
  const router = useRouter();

  const handleBookNow = () => {
    // Redirect to booking page with serviceId as query parameter
    router.push(`/book?serviceId=${serviceId}`);
  };

  // Default styles for different variants
  const variantStyles = {
    primary: 'bg-gray-800 text-white hover:bg-gray-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-100',
  };

  const baseStyles =
    'px-6 py-3 rounded-lg font-semibold transition-colors duration-200';
  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      onClick={handleBookNow}
      className={finalClassName}
      aria-label={`Book ${label}`}
    >
      {label}
    </button>
  );
}

/**
 * BookNowLink Component - Alternative using Link component
 * Use this if you prefer Link over programmatic navigation
 */
export function BookNowLink({
  serviceId,
  label = 'Book Now',
  className = '',
  variant = 'primary',
}) {
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  const baseStyles =
    'inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center';
  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <a
      href={`/book?serviceId=${serviceId}`}
      className={finalClassName}
      aria-label={`Book ${label}`}
    >
      {label}
    </a>
  );
}

/**
 * ServiceCard Component with integrated Book Button
 * Complete service card with image, details, and book button
 */
export function ServiceCard({ service }) {
  return (
    <div className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      {/* Service Image (optional) */}
      {service.image && (
        <Image
          width={1000}
          height={1000}
          src={service.image}
          alt={service.name}
          className="mb-4 h-48 w-full rounded-lg object-cover"
        />
      )}

      {/* Service Name */}
      <h3 className="mb-2 text-xl font-bold text-gray-800">{service.name}</h3>

      {/* Service Description */}
      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
        {service.description || 'Professional service at your doorstep'}
      </p>

      {/* Duration & Category */}
      <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
        {service.duration && (
          <span className="flex items-center gap-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {service.duration}
          </span>
        )}
        {service.category && (
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
            {service.category}
          </span>
        )}
      </div>

      {/* Price and Book Button */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Starting from</span>
          <p className="text-2xl font-bold text-blue-600">₹{service.price}</p>
        </div>
        <BookNowButton serviceId={service.id} label="Book Now" />
      </div>
    </div>
  );
}
