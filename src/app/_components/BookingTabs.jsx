'use client'
import { useState } from 'react'

export default function BookingTabs() {
    const [activeTab, setActiveTab] = useState('All')

    const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

    return (
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm">
            <div className="flex space-x-1">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    )
}