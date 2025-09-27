import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';

export default function Mobileheader() {
  return (
    <div className="sticky top-0 right-0 left-0 z-50 flex max-w-screen items-center justify-between bg-white px-5 py-3 md:hidden">
      <div className="relative w-32">
        <Image
          src="/FulllogoBlack .png"
          alt="mobile logo"
          className="h-full w-full"
          width={1573}
          height={512}
        />
      </div>
      <div className="flex items-center gap-1 text-zinc-600">
        <FaLocationDot className="text-2xl text-blue-700" />
        <span>Ranchi, JH</span>
      </div>
    </div>
  );
}
