'use client'
import { useState } from 'react'
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
    FaUser
} from 'react-icons/fa6'

export default function ProfileMenu() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)

    const menuItems = [
        {
            id: 'personal',
            icon: FaUser,
            iconBg: 'bg-blue-500',
            title: 'Personal Information',
            subtitle: 'Update your details',
            hasArrow: true,
            href: '/profile/personal'
        },
        {
            id: 'payment',
            icon: FaCreditCard,
            iconBg: 'bg-green-500',
            title: 'Payment Methods',
            subtitle: 'Manage cards & wallets',
            hasArrow: true,
            href: '/profile/payment'
        },
        {
            id: 'history',
            icon: FaClockRotateLeft,
            iconBg: 'bg-purple-500',
            title: 'Order History',
            subtitle: 'View past orders',
            hasArrow: true,
            href: '/profile/history'
        },
        {
            id: 'addresses',
            icon: FaLocationDot,
            iconBg: 'bg-orange-500',
            title: 'Addresses',
            subtitle: 'Delivery locations',
            hasArrow: true,
            href: '/profile/addresses'
        },
        {
            id: 'notifications',
            icon: FaBell,
            iconBg: 'bg-red-500',
            title: 'Notifications',
            subtitle: 'Push, email, SMS',
            hasToggle: true,
            toggleState: notificationsEnabled,
            onToggle: () => setNotificationsEnabled(!notificationsEnabled)
        },
        {
            id: 'privacy',
            icon: FaShieldHalved,
            iconBg: 'bg-indigo-500',
            title: 'Privacy & Security',
            subtitle: 'Account protection',
            hasArrow: true,
            href: '/profile/privacy'
        },
        {
            id: 'support',
            icon: FaHeadset,
            iconBg: 'bg-cyan-500',
            title: 'Help & Support',
            subtitle: 'FAQ, contact us',
            hasArrow: true,
            href: '/profile/support'
        }
    ]

    return (
        <div className="space-y-3">
            {menuItems.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                            <item.icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {item.subtitle}
                            </p>
                        </div>

                        {/* Action */}
                        <div className="flex-shrink-0">
                            {item.hasArrow && (
                                <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            )}
                            {item.hasToggle && (
                                <button
                                    onClick={item.onToggle}
                                    className="transition-transform duration-200 hover:scale-110"
                                >
                                    {item.toggleState ? (
                                        <FaToggleOn className="w-8 h-8 text-blue-500" />
                                    ) : (
                                        <FaToggleOff className="w-8 h-8 text-gray-400" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}