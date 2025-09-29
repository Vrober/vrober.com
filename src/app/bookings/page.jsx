import BookingHeader from '../_components/BookingHeader'
import BookingTabs from '../_components/BookingTabs'
import CurrentBooking from '../_components/CurrentBooking'
import RecentBookings from '../_components/RecentBookings'

export default function BookingsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BookingHeader />
            <div className="px-4 pb-20">
                <BookingTabs />
                <CurrentBooking />
                <RecentBookings />
            </div>
        </div>
    )
}