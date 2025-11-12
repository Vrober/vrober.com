import CleaningServices from '../_components/CleaningServices';
import DesktopMessage from '../_components/DesktopMessage';
import MHomeCategory from '../_components/MHomeCategory';
import Mobileheader from '../_components/Mobileheader';
import MostBookedServices from '../_components/MostBookedServices';
import OtherServices from '../_components/OtherServices';
import PopularServices from '../_components/PopularServices';
import PremiumServices from '../_components/PremiumServices';
import SearchBar from '../_components/SearchBar';
import SalonforWomen from './../_components/SalonforWomen';

export default function Home() {
  return (
    <>
      {/* Desktop Message - Only shown on desktop */}
      <DesktopMessage />

      {/* Mobile Content - Only shown on mobile */}
      <div className="mb-20 md:hidden">
        <Mobileheader />
        <SearchBar />
        <MHomeCategory />
        <PopularServices />
        <MostBookedServices />
        <CleaningServices />
        <SalonforWomen />
        <PremiumServices />
        <OtherServices />
      </div>
    </>
  );
}
