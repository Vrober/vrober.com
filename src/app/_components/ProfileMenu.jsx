'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FaBell,
  FaChevronRight,
  FaClockRotateLeft,
  FaCreditCard,
  FaHeadset,
  FaLocationDot,
  FaShieldHalved,
  FaToggleOff,
  FaToggleOn,
  FaUser,
} from 'react-icons/fa6';

export default function ProfileMenu() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      id: 'personal',
      icon: FaUser,
      iconBg: 'bg-blue-500',
      title: 'Personal Information',
      subtitle: 'Update your details',
      hasArrow: true,
      href: '/profile/personal',
    },
    {
      id: 'payment',
      icon: FaCreditCard,
      iconBg: 'bg-green-500',
      title: 'Payment Methods',
      subtitle: 'Manage cards & wallets',
      hasArrow: true,
      href: '/profile/payment',
    },
    {
      id: 'history',
      icon: FaClockRotateLeft,
      iconBg: 'bg-purple-500',
      title: 'Order History',
      subtitle: 'View past orders',
      hasArrow: true,
      href: '/profile/history',
    },
    {
      id: 'addresses',
      icon: FaLocationDot,
      iconBg: 'bg-orange-500',
      title: 'Addresses',
      subtitle: 'Delivery locations',
      hasArrow: true,
      href: '/profile/addresses',
    },
    {
      id: 'notifications',
      icon: FaBell,
      iconBg: 'bg-red-500',
      title: 'Notifications',
      subtitle: 'Push, email, SMS',
      hasToggle: true,
      toggleState: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: 'privacy',
      icon: FaShieldHalved,
      iconBg: 'bg-indigo-500',
      title: 'Privacy & Security',
      subtitle: 'Account protection',
      hasArrow: true,
      href: '/profile/privacy',
    },
    {
      id: 'support',
      icon: FaHeadset,
      iconBg: 'bg-cyan-500',
      title: 'Help & Support',
      subtitle: 'FAQ, contact us',
      hasArrow: true,
      href: '/profile/support',
    },
  ];

  const Tile = ({ item }) => {
    const content = (
      <div className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex items-center space-x-4">
          <div className={`h-12 w-12 ${item.iconBg} flex flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110`}>
            <item.icon className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </div>
          <div className="flex-shrink-0">
            {item.hasArrow && (
              <FaChevronRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600" />
            )}
            {item.hasToggle && (
              <button onClick={item.onToggle} className="transition-transform duration-200 hover:scale-110">
                {item.toggleState ? (
                  <FaToggleOn className="h-8 w-8 text-blue-500" />
                ) : (
                  <FaToggleOff className="h-8 w-8 text-gray-400" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
    return item.href ? (
      <Link href={item.href} className="block">{content}</Link>
    ) : (
      <div className="cursor-pointer">{content}</div>
    );
  };

  return (
    <div className="space-y-3">
      {menuItems.map((item) => (
        <Tile key={item.id} item={item} />
      ))}
    </div>
  );
}
