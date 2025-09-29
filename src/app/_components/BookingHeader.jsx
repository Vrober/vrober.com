import { FaArrowLeft, FaEllipsisVertical } from 'react-icons/fa6'

export default function BookingHeader() {
    return (
        <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
                <button className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaArrowLeft className="w-5 h-5 text-gray-700" />
                </button>

                <h1 className="text-xl font-semibold text-gray-900">
                    My Bookings
                </h1>

                <button className="p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEllipsisVertical className="w-5 h-5 text-gray-700" />
                </button>
            </div>
        </div>
    )
}