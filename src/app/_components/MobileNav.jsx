import { FaCalendar, FaHouse, FaPhone, FaUser } from 'react-icons/fa6';

import Link from 'next/link';

export default function MobileNav() {
  const navItem = [
    { name: 'Home', icon: <FaHouse className="h-5 w-5" />, link: '/' },
    {
      name: 'Callback',
      icon: <FaPhone className="h-5 w-5" />,
      link: '/callback',
    },
    {
      name: 'Bookings',
      icon: <FaCalendar className="h-5 w-5" />,
      link: '/bookings',
    },
    { name: 'Profile', icon: <FaUser className="h-5 w-5" />, link: '/profile' },
  ];
  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-50 flex max-w-screen justify-between border-t border-gray-200 bg-white px-9 py-3 shadow-md md:hidden">
        {navItem.map((item, i) => (
          <Link href={item.link} key={i}>
            <div className="flex cursor-pointer flex-col items-center justify-center text-black transition-colors duration-200 hover:text-gray-700 md:hidden">
              {item.icon}
              <span className="text-[0.8em] text-black">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
