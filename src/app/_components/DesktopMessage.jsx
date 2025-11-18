'use client';
import { useEffect, useState } from 'react';

export default function DesktopMessage() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);

  // Animated icons for mobile devices
  const mobileIcons = ['📱', '💻', '🔧', '🏠'];

  // Cycle through icons for animation
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % mobileIcons.length);
    }, 2000);

    return () => clearInterval(iconInterval);
  }, [mobileIcons.length]);

  if (!isVisible) return null;

  return (
    <div className="relative hidden min-h-screen overflow-hidden bg-white md:flex">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gray-800 opacity-10"></div>
        <div
          className="absolute top-60 right-32 h-24 w-24 animate-bounce rounded-full bg-gray-200 opacity-40"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gray-800 opacity-10"
          style={{ animationDelay: '2s' }}
        ></div>

        {/* Floating Service Icons */}
        <div className="animate-float absolute top-32 right-20 text-4xl">
          🔧
        </div>
        <div
          className="animate-float absolute bottom-32 left-20 text-4xl"
          style={{ animationDelay: '1.5s' }}
        >
          🏠
        </div>
        <div
          className="animate-float absolute top-1/2 left-10 text-4xl"
          style={{ animationDelay: '3s' }}
        >
          ⚡
        </div>
        <div
          className="animate-float absolute right-1/3 bottom-20 text-4xl"
          style={{ animationDelay: '2.5s' }}
        >
          🔨
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated Mobile Icon */}
          <div className="mb-8">
            <div className="inline-block transform rounded-full bg-white p-6 shadow-2xl transition-all duration-300 hover:scale-110">
              <span className="inline-block animate-bounce text-6xl">
                {mobileIcons[currentIcon]}
              </span>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-6">
            <h1 className="text-4xl leading-tight font-bold text-gray-800 md:text-5xl">
              <span className="text-green-500">Vrober</span> is Mobile First! 📱
            </h1>

            <p className="mx-auto max-w-xl text-xl leading-relaxed text-gray-800">
              We&apos;ve crafted an amazing mobile experience just for you! Our
              desktop version is currently under development.
            </p>

            <div className="mx-auto max-w-md rounded-2xl border border-black bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-800">
                📱 For the best experience:
              </p>
              <ul className="space-y-1 text-sm text-gray-800">
                <li>• Open this website on your mobile device</li>
                <li>• Add to your home screen for quick access</li>
                <li>• Enjoy our optimized mobile interface</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="transform rounded-xl bg-gray-800 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                📋 Copy Link to Share
              </button>

              <button
                onClick={() => setIsVisible(false)}
                className="transform rounded-xl border-2 border-gray-800 bg-white px-8 py-4 font-semibold text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
              >
                Continue Anyway
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-800">
              💻 Desktop version coming soon with more features!
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-100 to-transparent opacity-50"></div>
    </div>
  );
}
