'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-12 lg:mt-20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Logo and About */}
          <div className="text-center space-y-4">
            <Image
              src="/logoblack.png"
              alt="Vrober"
              width={120}
              height={40}
              className="h-10 w-auto mx-auto"
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              Professional home services at your doorstep. Trusted by thousands of customers.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 border-t border-b border-slate-200 py-6">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+917903784438" className="flex items-center gap-3 text-slate-700 hover:text-emerald-600 transition-colors">
                <FaPhone className="text-emerald-600 text-sm flex-shrink-0" />
                <span className="text-sm">+91 7903784438</span>
              </a>
              <a href="mailto:support@vrober.com" className="flex items-center gap-3 text-slate-700 hover:text-emerald-600 transition-colors">
                <FaEnvelope className="text-emerald-600 text-sm flex-shrink-0" />
                <span className="text-sm">support@vrober.com</span>
              </a>
              <div className="flex items-start gap-3 text-slate-700">
                <FaLocationDot className="text-emerald-600 text-sm flex-shrink-0 mt-1" />
                <span className="text-sm">
                  Saketpuri, Ward No. 7<br />
                  Godda, Jharkhand – 814133
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">About Us</Link></li>
              <li><Link href="/partner" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Become a Partner</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/terms-conditions" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/legal/privacy-policy" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/cancellation-policy" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3 border-t border-slate-200 pt-6">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Follow Us</h4>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-12 border-b border-slate-200 pb-12">
          {/* Logo and Brand */}
          <div className="col-span-1 space-y-4">
            <Image
              src="/logoblack.png"
              alt="Vrober"
              width={140}
              height={50}
              className="h-12 w-auto"
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              Professional home services at your doorstep. Trusted by thousands.
            </p>
            <div className="flex gap-3 pt-4">
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaFacebook />
              </a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaInstagram />
              </a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaTwitter />
              </a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">All Services</Link></li>
              <li><Link href="/partner" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Become Partner</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">Popular Services</h4>
            <ul className="space-y-3">
              <li><Link href="/category/cleaning" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Home Cleaning</Link></li>
              <li><Link href="/category/salon" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Salon for Women</Link></li>
              <li><Link href="/category/appliance" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Appliance Repair</Link></li>
              <li><Link href="/category/home-repair" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Home Repair</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/legal/terms-conditions" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/legal/privacy-policy" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/cancellation-policy" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/legal/user-agreement" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">User Agreement</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+917903784438" className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                <FaPhone className="text-emerald-600 flex-shrink-0" />
                +91 7903784438
              </a>
              <a href="mailto:support@vrober.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                <FaEnvelope className="text-emerald-600 flex-shrink-0" />
                support@vrober.com
              </a>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <FaLocationDot className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Godda, Jharkhand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-slate-600 text-center md:text-left">
              © {currentYear} Vrober. All rights reserved. | Made with ❤️ for your home.
            </p>
            <div className="flex gap-6 text-xs md:text-sm">
              <Link href="/legal/privacy-policy" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Privacy
              </Link>
              <Link href="/legal/terms-conditions" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Terms
              </Link>
              <a href="mailto:support@vrober.com" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}