import Image from 'next/image'
import { FaCamera, FaStar } from 'react-icons/fa6'

export default function UserProfileCard() {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 -mt-8 mx-4 relative z-20 mb-6">
            <div className="p-6 text-center">
                {/* Profile Avatar */}
                <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                        <Image
                            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Sarah Johnson"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Camera Icon */}
                    <button className="absolute bottom-0 right-1/2 translate-x-8 translate-y-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                        <FaCamera className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Sarah Johnson</h2>
                <p className="text-sm text-gray-600 mb-3">sarah.johnson@email.com</p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-6">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-lg font-bold text-gray-900">4.9</span>
                    <span className="text-sm text-gray-600">rating</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-around pt-4 border-t border-gray-100">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">127</div>
                        <div className="text-sm text-gray-600">Orders</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">4.9</div>
                        <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">2.3K</div>
                        <div className="text-sm text-gray-600">Points</div>
                    </div>
                </div>
            </div>
        </div>
    )
}