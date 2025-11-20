'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Vrober</h3>
            <p className="text-gray-300 mb-4">
              Providing quality home services at your doorstep. Professional, reliable, and affordable.
            </p>
            <div className="text-gray-300">
              <p className="mb-2">📍 Saketpuri, Ward No. 7</p>
              <p className="mb-2">Godda, Jharkhand – 814133</p>
              <p className="mb-2">📞 +91 7903784438</p>
              <p>📧 support@vrober.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/vendor" className="text-gray-300 hover:text-white transition-colors">
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/cleaning" className="text-gray-300 hover:text-white transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/category/ac-appliances" className="text-gray-300 hover:text-white transition-colors">
                  AC Repair
                </Link>
              </li>
              <li>
                <Link href="/category/grooming" className="text-gray-300 hover:text-white transition-colors">
                  Grooming
                </Link>
              </li>
              <li>
                <Link href="/category/painting" className="text-gray-300 hover:text-white transition-colors">
                  Painting
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms-conditions" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link href="/legal/partner-agreement" className="text-gray-300 hover:text-white transition-colors">
                  Partner Agreement
                </Link>
              </li> */}
              <li>
                <Link href="/legal/cancellation-policy" className="text-gray-300 hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/user-agreement" className="text-gray-300 hover:text-white transition-colors">
                  User Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Vrober. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/legal/privacy-policy" 
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/legal/terms-conditions" 
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}