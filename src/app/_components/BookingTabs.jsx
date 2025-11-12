'use client';
import { useState } from 'react';

export default function BookingTabs() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  return (
    <div className="mb-6 rounded-xl bg-white p-1 shadow-sm">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
