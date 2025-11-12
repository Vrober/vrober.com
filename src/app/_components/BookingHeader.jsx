import { FaArrowLeft, FaEllipsisVertical } from 'react-icons/fa6';

export default function BookingHeader() {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        <button className="-ml-2 rounded-lg p-2 transition-colors hover:bg-gray-100">
          <FaArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <h1 className="text-xl font-semibold text-gray-900">My Bookings</h1>

        <button className="-mr-2 rounded-lg p-2 transition-colors hover:bg-gray-100">
          <FaEllipsisVertical className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
