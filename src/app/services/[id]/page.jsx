'use client';

import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaStar,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import api from '@/lib/axios';

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = params.id;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(0);

  useEffect(() => {
    if (!serviceId) return;

    let active = true;
    setLoading(true);

    api
      .get(`/services/${serviceId}`)
      .then((res) => {
        if (!active) return;
        setService(res.data.service);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load service');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [serviceId]);

  const handleBookNow = (packageIndex = 0) => {
    router.push(`/book?serviceId=${serviceId}&package=${packageIndex}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="skeleton mb-4 h-8 w-48"></div>
          <div className="skeleton mb-6 h-64 w-full rounded-xl"></div>
          <div className="skeleton mb-2 h-6 w-3/4"></div>
          <div className="skeleton mb-4 h-4 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft /> Back
          </button>
          <div className="rounded-xl bg-white p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!service) return null;

  // Generate service packages based on service type
  const generatePackages = (baseService) => {
    const basePrice = baseService.price || 500;

    if (
      baseService.category === 'ac-services' ||
      baseService.serviceName?.toLowerCase().includes('ac')
    ) {
      return [
        {
          name: `Foam-jet service (2 ACs)`,
          description:
            'Dust-free filters & better airflow. Applicable for both window or split ACs. Indoor unit deep cleaning with foam & jet spray.',
          price: Math.round(basePrice * 0.8),
          originalPrice: Math.round(basePrice),
          savings: Math.round(basePrice * 0.2),
          duration: '1 hr 30 mins',
          rating: 4.77,
          reviews: '1.8M',
          features: [
            'Applicable for both window or split ACs',
            'Indoor unit deep cleaning with foam & jet spray',
            'Dust-free filters & better airflow',
            'Professional equipment & eco-friendly cleaning agents',
          ],
          badge: '2 ACs PACK',
        },
        {
          name: `Foam-jet service (3 ACs)`,
          description:
            'Deep cleaning for 3 AC units with professional foam & jet technology. Complete maintenance package.',
          price: Math.round(basePrice * 1.2),
          originalPrice: Math.round(basePrice * 1.5),
          savings: Math.round(basePrice * 0.3),
          duration: '2 hrs 15 mins',
          rating: 4.77,
          reviews: '1.8M',
          features: [
            'Deep cleaning for 3 AC units',
            'Professional foam & jet spray technology',
            'Filter cleaning & maintenance',
            'Post-service warranty included',
          ],
          badge: '3 ACs PACK',
        },
      ];
    }

    // Default packages for other services
    return [
      {
        name: service.serviceName,
        description:
          service.description || 'Professional service at your doorstep',
        price: basePrice,
        duration: service.duration || '1-2 hrs',
        rating: service.rating || 4.5,
        reviews: '1.2M',
        features: [
          'Professional service guarantee',
          'Experienced & verified technicians',
          'Quality materials included',
          'Post-service support',
        ],
      },
      {
        name: `Premium ${service.serviceName}`,
        description: `Enhanced ${service.serviceName.toLowerCase()} with premium materials and extended warranty`,
        price: Math.round(basePrice * 1.3),
        originalPrice: Math.round(basePrice * 1.6),
        savings: Math.round(basePrice * 0.3),
        duration: service.duration || '2-3 hrs',
        rating: service.rating || 4.7,
        reviews: '800K',
        features: [
          'Premium quality materials',
          'Extended warranty coverage',
          'Priority booking & support',
          'Advanced tools & techniques',
        ],
        badge: 'PREMIUM',
      },
    ];
  };

  const packages = generatePackages(service);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <FaArrowLeft className="text-gray-700" />
            </button>
            <h1 className="line-clamp-1 text-lg font-semibold text-gray-900">
              {service.serviceName || 'Service Details'}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Service Image & Info */}
        <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="relative h-64">
            <Image
              src={service.imageUrl || '/assets/placeholder.png'}
              alt={service.serviceName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="mb-1 text-2xl font-bold">{service.serviceName}</h2>
              <div className="flex items-center gap-2 text-sm">
                <FaStar className="text-yellow-400" />
                <span>{service.rating || 4.5}</span>
                <span className="text-gray-300">• Professional Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Super Saver Packages Header */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Super saver packages
          </h2>
          <p className="text-sm text-gray-600">
            Choose the package that best fits your needs
          </p>
        </div>

        {/* Service Packages */}
        <div className="space-y-4">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-xl border-2 bg-white shadow-sm transition-all ${
                selectedPackage === index
                  ? 'border-black shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPackage(index)}
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {pkg.badge && (
                        <span className="rounded-full bg-black px-2 py-1 text-xs font-bold text-white">
                          {pkg.badge}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-gray-900">
                        {pkg.name}
                      </h3>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 grid gap-1">
                      {pkg.features?.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <FaCheck className="mt-1 flex-shrink-0 text-xs text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rating & Duration */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-xs text-yellow-400" />
                        <span className="font-medium">{pkg.rating}</span>
                        <span>({pkg.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="ml-4 text-right">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{pkg.originalPrice}
                        </span>
                      )}
                    </div>
                    {pkg.savings && (
                      <div className="mb-2 text-xs font-medium text-green-600">
                        ₹{pkg.savings} per AC
                      </div>
                    )}
                  </div>
                </div>

                {/* View Details Link */}
                <div className="flex items-center justify-between">
                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    View details
                  </button>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaMapMarkerAlt />
                    <span>Available in your area</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="sticky bottom-4 mt-8">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected Package:</p>
                <p className="font-semibold text-gray-900">
                  {packages[selectedPackage]?.name}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{packages[selectedPackage]?.price}
                </p>
              </div>
              <button
                onClick={() => handleBookNow(selectedPackage)}
                className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-900"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
