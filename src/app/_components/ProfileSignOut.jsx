import { FaRightFromBracket } from 'react-icons/fa6'

export default function ProfileSignOut() {
    return (
        <div className="mt-6 mb-4">
            <button className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl p-4 transition-all duration-200 group">
                <div className="flex items-center justify-center space-x-3">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <FaRightFromBracket className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-red-600 group-hover:text-red-700">
                        Sign Out
                    </span>
                </div>
            </button>
        </div>
    )
}