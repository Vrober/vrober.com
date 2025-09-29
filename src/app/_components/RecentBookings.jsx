import { FaDumbbell, FaHandSparkles, FaSpa, FaStar } from 'react-icons/fa6'

export default function RecentBookings() {
    const recentBookings = [
        {
            id: 1,
            title: "Deep Tissue Massage",
            location: "Wellness Spa",
            date: "Dec 15, 3:00 PM",
            price: "$120",
            status: "Completed",
            statusColor: "text-green-600",
            statusBg: "bg-green-100",
            icon: FaSpa,
            iconBg: "bg-orange-500",
            rating: 5.0,
            actionText: "Book Again",
            actionColor: "text-blue-600"
        },
        {
            id: 2,
            title: "Manicure & Pedicure",
            location: "Beauty Lounge",
            date: "Dec 10, 11:00 AM",
            price: "$65",
            status: "Completed",
            statusColor: "text-green-600",
            statusBg: "bg-green-100",
            icon: FaHandSparkles,
            iconBg: "bg-pink-500",
            rating: 4.0,
            actionText: "Book Again",
            actionColor: "text-blue-600"
        },
        {
            id: 3,
            title: "Personal Training",
            location: "FitLife Gym",
            date: "Dec 8, 6:00 AM",
            price: "$90",
            status: "Cancelled",
            statusColor: "text-red-600",
            statusBg: "bg-red-100",
            icon: FaDumbbell,
            iconBg: "bg-red-500",
            rating: null,
            actionText: "Reschedule",
            actionColor: "text-blue-600",
            refund: "Refund: $90"
        }
    ]

    const renderStars = (rating) => {
        if (!rating) return null

        return (
            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View All
                </button>
            </div>

            <div className="space-y-3">
                {recentBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start space-x-3">
                            {/* Service Icon */}
                            <div className={`w-12 h-12 ${booking.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <booking.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Booking Details */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 mb-1">
                                            {booking.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {booking.location}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 ${booking.statusBg} ${booking.statusColor} text-sm font-medium rounded-full`}>
                                        {booking.status}
                                    </span>
                                </div>

                                {/* Date and Price */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-gray-600">{booking.date}</span>
                                    <span className="text-lg font-bold text-gray-900">{booking.price}</span>
                                </div>

                                {/* Action and Rating */}
                                <div className="flex items-center justify-between">
                                    <button className={`${booking.actionColor} text-sm font-medium hover:underline`}>
                                        {booking.actionText}
                                    </button>
                                    {renderStars(booking.rating)}
                                </div>

                                {/* Refund Info for Cancelled */}
                                {booking.refund && (
                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">{booking.refund}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}