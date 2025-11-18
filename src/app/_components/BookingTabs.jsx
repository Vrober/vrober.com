'use client';
import { useState } from 'react';

export default function BookingTabs() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  return (
    <div className="mb-6 rounded-xl border border-gray-800 bg-white p-1 shadow-sm">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
