import Image from 'next/image';

export default function PremiumServices() {
  const premiumServices = [
    {
      id: 1,
      title: 'Professional Deep Cleaning',
      desc: 'Expert office and home deep cleaning with professional equipment',
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹999',
      originalPrice: '₹1,499',
      badge: 'Premium',
      bottomText: 'Includes carpet cleaning & sanitization',
      bgGradient: 'from-orange-400 to-yellow-500',
    },
    {
      id: 2,
      title: 'Luxury Home Spa Service',
      desc: 'Premium spa treatment in the comfort of your home',
      img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹1,999',
      originalPrice: '₹2,999',
      badge: 'Exclusive',
      bottomText: '2-hour session with certified therapist',
      bgGradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      title: 'Premium AC Installation',
      desc: 'Complete AC installation with 5-year warranty',
      img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '₹2,499',
      originalPrice: '₹3,999',
      badge: 'Best Value',
      bottomText: 'Free maintenance for 1st year',
      bgGradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Premium Services</h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
        {premiumServices.map((service) => (
          <div
            key={service.id}
            className="group relative max-w-[280px] min-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            {/* Premium Badge */}
            <div
              className={`absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${service.bgGradient}`}
            >
              {service.badge}
            </div>

            {/* Service Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={service.img}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Card Content */}
            <div className="space-y-3 p-4">
              {/* Title & Description */}
              <div>
                <h3 className="mb-1 text-lg font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {service.desc}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-800">
                  {service.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {service.originalPrice}
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Save{' '}
                  {Math.round(
                    ((parseInt(
                      service.originalPrice.replace('₹', '').replace(',', '')
                    ) -
                      parseInt(
                        service.price.replace('₹', '').replace(',', '')
                      )) /
                      parseInt(
                        service.originalPrice.replace('₹', '').replace(',', '')
                      )) *
                      100
                  )}
                  %
                </span>
              </div>

              {/* Book Now Button */}
              <button
                className={`w-full rounded-xl bg-gradient-to-r py-3 font-semibold text-white ${service.bgGradient} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                Book Now
              </button>

              {/* Bottom Text */}
              <p className="border-t border-gray-100 pt-2 text-center text-xs text-gray-500 italic">
                {service.bottomText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
