import { FaCalendarDay, FaClock, FaScissors } from 'react-icons/fa6'

export default function CurrentBooking() {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Booking</h2>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                    {/* Service Icon */}
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaScissors className="w-6 h-6 text-white" />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Hair Cut & Styling
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Salon Bliss - Downtown
                        </p>

                        {/* Date and Time */}
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <FaCalendarDay className="w-4 h-4" />
                                <span>Today, 2:30 PM</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <FaClock className="w-4 h-4" />
                                <span>45 min</span>
                            </div>
                        </div>

                        {/* Price and Status */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-gray-900">$85</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                Confirmed
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                            <button className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                                View Details
                            </button>
                            <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                                Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}