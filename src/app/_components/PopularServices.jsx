import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

export default function PopularServices() {
  const popularServices = [
    {
      id: 1,
      title: 'AC Repair & Service',
      desc: 'Professional AC repair and maintenance services to keep your cooling system running efficiently.',
      img: 'https://images.pexels.com/photos/33671149/pexels-photo-33671149.jpeg',
      rating: '4.5(95k)',
      price: '₹499',
      discountPrice: '₹299',
    },
    {
      id: 2,
      title: 'Electrical Services',
      desc: 'Expert electrical installation and repair services for your home and office needs.',
      img: 'https://images.pexels.com/photos/9679179/pexels-photo-9679179.jpeg',
      rating: '4.7(87k)',
      price: '₹399',
      discountPrice: '₹249',
    },
    {
      id: 3,
      title: 'Plumbing Services',
      desc: 'Professional plumbing solutions for all your water and drainage requirements.',
      img: 'https://images.pexels.com/photos/12142829/pexels-photo-12142829.jpeg',
      rating: '4.6(92k)',
      price: '₹599',
      discountPrice: '₹399',
    },
  ];

  return (
    <div className="my-9">
      <h2 className="Seaction-heading">Popular Services</h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
        {/* Popular services card */}
        {popularServices.map((m) => {
          return (
            <div
              key={m.id}
              className="max-w-[340px] min-w-[300px] flex-shrink-0 rounded-lg bg-[#F2F2F2] p-4"
            >
              <div className="flex gap-3">
                <div className="h-25 w-25 shrink-0 overflow-hidden rounded-md border-2 border-white bg-red-200">
                  <Image
                    className="h-full w-full shrink-0 object-cover"
                    src={m.img}
                    alt="vj"
                    height={1000}
                    width={1000}
                  />
                </div>
                <div>
                  <h1 className="text-xl leading-6 font-semibold text-zinc-700">
                    {m.title}
                  </h1>
                  <p className="line-clamp-2 leading-5 text-zinc-500">
                    {m.desc}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    {m.rating}
                  </p>
                  <p className="">
                    ₹ {m.price}{' '}
                    <span className="text-gray-500 line-through">
                      {m.discountPrice}
                    </span>
                  </p>
                </div>
              </div>
              <button className="w-full rounded-md border border-gray-400 bg-blue-600/80 py-1 font-bold text-white">
                Book now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
