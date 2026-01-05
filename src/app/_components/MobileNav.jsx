import { FaCartShopping, FaCalendar, FaHouse, FaUser } from 'react-icons/fa6';
import Link from 'next/link';

export default function MobileNav() {
  const navItem = [
    { name: 'Home', icon: <FaHouse className="h-5 w-5" />, link: '/' },
    {
      name: 'Cart',
      icon: <FaCartShopping className="h-5 w-5" />,
      link: '/cart',
    },
    {
      name: 'Bookings',
      icon: <FaCalendar className="h-5 w-5" />,
      link: '/bookings',
    },
    { name: 'Profile', icon: <FaUser className="h-5 w-5" />, link: '/profile' },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 flex max-w-screen justify-between border-t border-slate-200 bg-white px-4 py-2 shadow-lg md:hidden">
      {navItem.map((item, i) => (
        <Link href={item.link} key={i} className="flex-1">
          <div className="flex flex-col items-center justify-center py-2 text-slate-600 transition-colors duration-200 hover:text-emerald-600">
            {item.icon}
            <span className="mt-1 text-center text-[0.65rem] font-medium">
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
