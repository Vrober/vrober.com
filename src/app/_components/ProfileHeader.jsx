import { FaArrowLeft, FaEllipsisVertical } from 'react-icons/fa6';

export default function ProfileHeader() {
  return (
    <div className="relative overflow-hidden bg-gray-800 px-4 py-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white"></div>
        <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 rounded-full bg-white"></div>
      </div>

      {/* Header Content */}
      <div className="relative z-10 flex items-center justify-between">
        <button className="-ml-2 rounded-lg p-2 transition-colors hover:bg-white/20">
          <FaArrowLeft className="h-5 w-5 text-white" />
        </button>

        <h1 className="text-xl font-semibold text-white">Profile</h1>

        <button className="-mr-2 rounded-lg p-2 transition-colors hover:bg-white/20">
          <FaEllipsisVertical className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
