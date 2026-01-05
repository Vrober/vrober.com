'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" border-t border-slate-200 bg-white lg:mt-20">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
        {/* Mobile Layout */}
        <div className="space-y-8 lg:hidden">
          {/* Logo and About */}
          <div className="space-y-6 border-b border-slate-200 pb-6 text-center">
            <Image
              src="/logoblack.png"
              alt="Vrober"
              width={150}
              height={50}
              className="mx-auto h-12 w-auto"
            />
            <p className="text-sm leading-relaxed text-slate-600">
              Professional home services at your doorstep. Trusted by thousands
              of customers.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 border-b border-slate-200 py-6">
            <h4 className="text-sm font-bold tracking-widest text-slate-900 uppercase">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+917903784438"
                className="flex items-center gap-3 text-slate-700 transition-colors hover:text-emerald-600"
              >
                <FaPhone className="flex-shrink-0 text-sm text-emerald-600" />
                <span className="text-sm">+91 7903784438</span>
              </a>
              <a
                href="mailto:support@vrober.com"
                className="flex items-center gap-3 text-slate-700 transition-colors hover:text-emerald-600"
              >
                <FaEnvelope className="flex-shrink-0 text-sm text-emerald-600" />
                <span className="text-sm">support@vrober.com</span>
              </a>
              <div className="flex items-start gap-3 text-slate-700">
                <FaLocationDot className="mt-1 flex-shrink-0 text-sm text-emerald-600" />
                <span className="text-sm">
                  Jamshedpur, Jharkhand
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-widest text-slate-900 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-widest text-slate-900 uppercase">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/terms-conditions"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cancellation-policy"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3 pt-6">
            <h4 className="text-sm font-bold tracking-widest text-slate-900 uppercase">
              Follow Us
            </h4>
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden grid-cols-5 gap-12 border-b border-slate-200 pb-12 lg:grid">
          {/* Logo and Brand */}
          <div className="col-span-1 space-y-4">
            <Image
              src="/logoblack.png"
              alt="Vrober"
              width={140}
              height={50}
              className="h-12 w-auto"
            />
            <p className="text-sm leading-relaxed text-slate-600">
              Professional home services at your doorstep. Trusted by thousands.
            </p>
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-600"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-widest text-slate-900 uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Become Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-widest text-slate-900 uppercase">
              Popular Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/cleaning"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/category/salon"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Salon for Women
                </Link>
              </li>
              <li>
                <Link
                  href="/category/appliance"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Appliance Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/category/home-repair"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Home Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-widest text-slate-900 uppercase">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal/terms-conditions"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cancellation-policy"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/user-agreement"
                  className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                >
                  User Agreement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-widest text-slate-900 uppercase">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+917903784438"
                className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-emerald-600"
              >
                <FaPhone className="flex-shrink-0 text-emerald-600" />
                +91 7903784438
              </a>
              <a
                href="mailto:support@vrober.com"
                className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-emerald-600"
              >
                <FaEnvelope className="flex-shrink-0 text-emerald-600" />
                support@vrober.com
              </a>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <FaLocationDot className="mt-0.5 flex-shrink-0 text-emerald-600" />
                <span>Jamshedpur, Jharkhand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs text-slate-600 md:text-left md:text-sm">
              © {currentYear} Vrober. All rights reserved. | Made with ❤️ for
              your home.
            </p>
            <div className="flex gap-6 text-xs md:text-sm">
              <Link
                href="/legal/privacy-policy"
                className="text-slate-600 transition-colors hover:text-emerald-600"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms-conditions"
                className="text-slate-600 transition-colors hover:text-emerald-600"
              >
                Terms
              </Link>
              <a
                href="mailto:support@vrober.com"
                className="text-slate-600 transition-colors hover:text-emerald-600"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
