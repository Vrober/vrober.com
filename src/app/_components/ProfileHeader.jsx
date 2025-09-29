import { FaArrowLeft, FaEllipsisVertical } from 'react-icons/fa6'

export default function ProfileHeader() {
    return (
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 px-4 py-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Header Content */}
            <div className="relative z-10 flex items-center justify-between">
                <button className="p-2 -ml-2 hover:bg-white/20 rounded-lg transition-colors">
                    <FaArrowLeft className="w-5 h-5 text-white" />
                </button>

                <h1 className="text-xl font-semibold text-white">
                    Profile
                </h1>

                <button className="p-2 -mr-2 hover:bg-white/20 rounded-lg transition-colors">
                    <FaEllipsisVertical className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    )
}