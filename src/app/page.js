import Mobileheader from './_components/Mobileheader';
import MobileNav from './_components/MobileNav';
import Home from './Home/page';

export default function page() {
  return (
    <div className="px-2">
      <Mobileheader />
      <MobileNav />
      <Home />
    </div>
  );
}
