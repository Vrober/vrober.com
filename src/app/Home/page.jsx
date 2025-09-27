import DesktopMessage from '../_components/DesktopMessage';
import MHomeCategory from '../_components/MHomeCategory';
import MostBookedServices from '../_components/MostBookedServices';
import PopularServices from '../_components/PopularServices';
import SearchBar from '../_components/SearchBar';

export default function Home() {
    return (
        <>
            {/* Desktop Message - Only shown on desktop */}
            <DesktopMessage />

            {/* Mobile Content - Only shown on mobile */}
            <div className="md:hidden">
                <SearchBar />
                <MHomeCategory />
                <PopularServices />
                <MostBookedServices />
            </div>
        </>
    );
}
