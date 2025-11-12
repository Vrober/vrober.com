import { FaCalendarDay, FaClock, FaScissors } from 'react-icons/fa6';

export default function CurrentBooking() {
  return (
    <div className="mb-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Current Booking
      </h2>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-start space-x-3">
          {/* Service Icon */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500">
            <FaScissors className="h-6 w-6 text-white" />
          </div>

          {/* Booking Details */}
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              Hair Cut & Styling
            </h3>
            <p className="mb-2 text-sm text-gray-600">Salon Bliss - Downtown</p>

            {/* Date and Time */}
            <div className="mb-3 flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <FaCalendarDay className="h-4 w-4" />
                <span>Today, 2:30 PM</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <FaClock className="h-4 w-4" />
                <span>45 min</span>
              </div>
            </div>

            {/* Price and Status */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">$85</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Confirmed
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 rounded-xl bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
                View Details
              </button>
              <button className="flex-1 rounded-xl bg-gray-100 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
