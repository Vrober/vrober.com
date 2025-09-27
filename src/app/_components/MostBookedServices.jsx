import Image from 'next/image';

export default function MostBookedServices() {
  const mostBookedServices = [
    {
      id: 1,
      title: 'AC Foam Cleaning',
      desc: 'Professional AC repair and maintenance',
      img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      rating: '4.1',
      reviews: '95k',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    },
    {
      id: 2,
      title: 'Deep Cleaning Service',
      desc: 'Complete home deep cleaning',
      img: 'https://images.pexels.com/photos/3768910/pexels-photo-3768910.jpeg',
      rating: '4.3',
      reviews: '87k',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    },
    {
      id: 3,
      title: 'Electrical Repair',
      desc: 'Expert electrical services',
      img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: '4.5',
      reviews: '92k',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    },
    {
      id: 4,
      title: 'AC Foam Cleaning',
      desc: 'Professional AC repair and maintenance',
      img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      rating: '4.1',
      reviews: '95k',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
    },
  ];

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Most Booked Services</h2>
      <div className="grid grid-cols-2 gap-4 px-4">
        {mostBookedServices.map((service) => (
          <div
            key={service.id}
            className={`service-card ${service.bgColor} ${service.textColor} rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg`}
          >
            {/* Service Image */}
            <div className="mb-4 overflow-hidden rounded-xl">
              <Image
                src={service.img}
                alt={service.title}
                width={200}
                height={120}
                className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Service Content */}
            <div className="space-y-2">
              {/* Title */}
              <h3 className="text-lg leading-tight font-semibold">
                {service.title}
              </h3>

              {/* Description */}
              <p className="line-clamp-2 text-sm opacity-70">{service.desc}</p>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium">
                  {service.rating} ({service.reviews})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
