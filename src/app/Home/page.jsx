'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  FaArrowRight,
  FaBolt,
  FaCartShopping,
  FaChartLine,
  FaCircleCheck,
  FaCrown,
  FaFire,
  FaLocationDot,
  FaStar,
} from 'react-icons/fa6';
import api from '@/lib/axios';
import useUserLocation from '@/lib/useUserLocation';
import { useCart } from '@/lib/cartContext';
import SearchBar from '../_components/SearchBar';

const SERVICE_SKELETONS = Array.from({ length: 6 });
const CATEGORY_SKELETONS = Array.from({ length: 8 });

export default function Home() {
  const { text: location, isLoading: locationLoading } = useUserLocation();
  const { getTotalItems } = useCart();

  const [categories, setCategories] = useState([]);
  const [categoryState, setCategoryState] = useState({ loading: true, error: null });

  const [popular, setPopular] = useState([]);
  const [premium, setPremium] = useState([]);
  const [trending, setTrending] = useState([]);
  const [other, setOther] = useState([]);
  const [mostBooked, setMostBooked] = useState([]);
  const [salonServices, setSalonServices] = useState([]);
  const [cleaningServices, setCleaningServices] = useState([]);
  const [applianceServices, setApplianceServices] = useState([]);
  const [homeRepairServices, setHomeRepairServices] = useState([]);

  const [sectionState, setSectionState] = useState({
    popular: { loading: true, error: null },
    premium: { loading: true, error: null },
    trending: { loading: true, error: null },
    other: { loading: true, error: null },
    mostBooked: { loading: true, error: null },
    salon: { loading: true, error: null },
    cleaning: { loading: true, error: null },
    appliance: { loading: true, error: null },
    homeRepair: { loading: true, error: null },
  });

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (!active) return;
        const cats = res.data.categories || [];
        const activeCats = cats
          .filter((c) => c.isActive !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(activeCats.slice(0, 12));
        setCategoryState({ loading: false, error: null });
      } catch (error) {
        if (!active) return;
        setCategoryState({
          loading: false,
          error: error.response?.data?.message || 'Failed to load categories',
        });
      } finally {
        if (active) {
          // Hide initial loader after a short delay for smooth transition
          setTimeout(() => setInitialLoading(false), 500);
        }
      }
    };

    const loadSection = async (key, params, setter) => {
      setSectionState((s) => ({ ...s, [key]: { ...s[key], loading: true } }));
      try {
        const res = await api.get('/services', { params });
        if (!active) return;
        const services = res.data.services || [];
        setter(services);
        setSectionState((s) => ({ ...s, [key]: { loading: false, error: null } }));
      } catch (error) {
        if (!active) return;
        setSectionState((s) => ({
          ...s,
          [key]: {
            loading: false,
            error: error.response?.data?.message || 'Failed to load services',
          },
        }));
      }
    };

    loadCategories();
    loadSection('popular', { popular: 'true', limit: 6 }, setPopular);
    loadSection('premium', { premium: 'true', limit: 6 }, setPremium);
    loadSection('trending', { sortBy: 'bookingCount', limit: 6 }, setTrending);
    loadSection('mostBooked', { sortBy: 'bookingCount', limit: 8 }, setMostBooked);
    
    // Load all services and filter client-side by patterns
    const loadCategorizedServices = async () => {
      setSectionState((s) => ({
        ...s,
        salon: { loading: true, error: null },
        cleaning: { loading: true, error: null },
        appliance: { loading: true, error: null },
        homeRepair: { loading: true, error: null },
      }));
      
      try {
        const res = await api.get('/services', { params: { limit: 100 } });
        if (!active) return;
        const allServices = res.data.services || [];
        
        // Filter by keywords in service names
        const salonKeywords = ['salon', 'beauty', 'makeup', 'facial', 'waxing', 'manicure', 'pedicure', 'haircut', 'hair', 'spa'];
        const cleaningKeywords = ['cleaning', 'clean', 'housekeeping', 'sanitize', 'deep clean', 'kitchen', 'bathroom'];
        const applianceKeywords = ['appliance', 'repair', 'ac', 'washing machine', 'refrigerator', 'microwave', 'geyser', 'tv'];
        const homeRepairKeywords = ['plumbing', 'electrical', 'carpenter', 'painting', 'repair', 'fix', 'install'];
        
        const matchesKeywords = (service, keywords) => {
          const text = `${service.serviceName} ${service.description || ''} ${service.category || ''}`.toLowerCase();
          return keywords.some(keyword => text.includes(keyword.toLowerCase()));
        };
        
        setSalonServices(allServices.filter(s => matchesKeywords(s, salonKeywords)).slice(0, 6));
        setCleaningServices(allServices.filter(s => matchesKeywords(s, cleaningKeywords)).slice(0, 6));
        setApplianceServices(allServices.filter(s => matchesKeywords(s, applianceKeywords)).slice(0, 6));
        setHomeRepairServices(allServices.filter(s => matchesKeywords(s, homeRepairKeywords)).slice(0, 6));
        
        setSectionState((s) => ({
          ...s,
          salon: { loading: false, error: null },
          cleaning: { loading: false, error: null },
          appliance: { loading: false, error: null },
          homeRepair: { loading: false, error: null },
        }));
      } catch (error) {
        if (!active) return;
        setSectionState((s) => ({
          ...s,
          salon: { loading: false, error: 'Failed to load services' },
          cleaning: { loading: false, error: 'Failed to load services' },
          appliance: { loading: false, error: 'Failed to load services' },
          homeRepair: { loading: false, error: 'Failed to load services' },
        }));
      }
    };
    
    loadCategorizedServices();
    
    loadSection('other', { limit: 30 }, (services) => {
      // Exclude already curated flags so this shows variety
      const filtered = services.filter((s) => !s.isPopular && !s.isPremium);
      setOther(filtered.slice(0, 6));
    });

    return () => {
      active = false;
    };
  }, []);

  const heroHighlights = useMemo(
    () => [
      { icon: <FaCircleCheck className="text-sm" />, label: 'Certified professionals' },
      { icon: <FaCircleCheck className="text-sm" />, label: 'Upfront pricing' },
      { icon: <FaCircleCheck className="text-sm" />, label: 'On-time arrival' },
    ],
    []
  );

  // Full-page loader
  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center space-y-6 px-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Image
              src="/FulllogoBlack .png"
              alt="Vrober"
              width={200}
              height={70}
              priority
              className="object-contain"
            />
          </div>
          
          {/* Horizontal Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes progress {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
          
          .animate-progress {
            animation: progress 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-white lg:bg-gradient-to-b lg:from-slate-50 lg:via-white lg:to-white">
      <MobileAppHeader location={location} isLoading={locationLoading} />

      {/* Mobile-first layout */}
      <main className="mx-auto max-w-6xl lg:px-10">
        {/* Mobile Hero */}
        <div className="lg:hidden">
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 px-4 py-6">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 40%)' }} />
            <div className="relative space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold leading-tight text-white">
                  What do you need today?
                </h1>
                <p className="text-sm text-emerald-100">
                  Trusted pros, transparent prices, instant booking.
                </p>
              </div>
              <div className="space-y-2">
                <SearchBar />
                <Link
                  href="/book"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:shadow-xl active:scale-95"
                >
                  <FaBolt className="text-sm" />
                  Book now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <header className="relative hidden overflow-hidden rounded-3xl border border-slate-200 bg-white px-10 py-12 shadow-sm lg:block">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(15,23,42,0.08),transparent_35%)]" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                <FaBolt className="text-xs" />
                <span>Home services on-demand</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Book trusted home services in minutes.
                </h1>
                <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
                  Choose from curated professionals for cleaning, grooming, repairs, and more—scheduled when it works for you.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <LocationPill location={location} isLoading={locationLoading} />
                {heroHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <SearchBar />
                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                    <FaFire /> Popular picks today
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    <FaArrowRight /> Book in 3 steps
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/book"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 sm:flex-none sm:px-6"
                  >
                    Book a service
                    <FaArrowRight className="text-xs" />
                  </Link>
                  <Link
                    href="/category/all"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 sm:flex-none sm:px-6"
                  >
                    Browse categories
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative hidden h-full min-h-[320px] w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-6 shadow-xl lg:block">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.1), transparent 35%)' }} />
              <div className="relative flex h-full flex-col justify-between">
                <div className="space-y-4 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Fast & Reliable</p>
                  <h2 className="text-2xl font-bold leading-tight">Vetted experts. Transparent pricing. Zero hassle.</h2>
                  <p className="text-sm text-emerald-100/90">
                    Get live updates, chat with professionals, and reschedule anytime from your booking dashboard.
                  </p>
                </div>
                <div className="grid gap-3 text-sm text-white/90">
                  {[
                    'Instant booking confirmations',
                    'Reschedule-friendly slots',
                    'Secure digital payments',
                    'Real-time job tracking',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <FaCircleCheck className="text-emerald-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sections */}
        <div className="lg:hidden space-y-1 pb-20">
          <MobileSectionShell
            title="Categories"
            subtitle="Browse by service type"
            icon={<FaArrowRight className="text-sm" />}
            loading={categoryState.loading}
            error={categoryState.error}
            seeAllLink="/category/all"
          >
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2">
              {categoryState.loading ? (
                CATEGORY_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-20 w-20 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                categories.map((category) => (
                  <MobileCategoryCard key={category._id} category={category} />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Popular now"
            subtitle="Most loved by customers"
            icon={<FaFire className="text-sm text-emerald-600" />}
            loading={sectionState.popular.loading}
            error={sectionState.popular.error}
            seeAllLink="/services?filter=popular"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.popular.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                popular.map((service) => (
                  <MobileServiceCard key={service._id} service={service} variant="highlight" />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Trending"
            subtitle="Climbing the charts this week"
            icon={<FaChartLine className="text-sm text-emerald-600" />}
            loading={sectionState.trending.loading}
            error={sectionState.trending.error}
            seeAllLink="/services?filter=trending"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.trending.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                trending.map((service) => (
                  <MobileServiceCard key={service._id} service={service} />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Premium"
            subtitle="Top-tier professionals"
            icon={<FaCrown className="text-sm text-amber-500" />}
            loading={sectionState.premium.loading}
            error={sectionState.premium.error}
            seeAllLink="/services?filter=premium"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.premium.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                premium.map((service) => (
                  <MobileServiceCard key={service._id} service={service} variant="premium" />
                ))
              )}
            </div>
          </MobileSectionShell>

          {/* Premium Banner Section */}
          <div className="px-4 py-2">
            <Link href="/book" className="block relative h-44 rounded-2xl overflow-hidden shadow-lg active:scale-[0.98] transition-transform">
              <Image
                src="/assets/WomenSalon.png"
                alt="Premium Services"
                fill
                className="object-cover"
                priority
              />
            </Link>
          </div>

          <MobileSectionShell
            title="Most booked services"
            subtitle="What everyone's booking right now"
            icon={<FaBolt className="text-sm text-emerald-600" />}
            loading={sectionState.mostBooked.loading}
            error={sectionState.mostBooked.error}
            seeAllLink="/services?filter=most-booked"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.mostBooked.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                mostBooked.map((service) => (
                  <MobileServiceCard key={service._id} service={service} />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Salon for Women"
            subtitle="Pamper yourself at home"
            icon={<FaStar className="text-sm text-pink-500" />}
            loading={sectionState.salon.loading}
            error={sectionState.salon.error}
            seeAllLink="/category/salon"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.salon.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                salonServices.map((service) => (
                  <MobileServiceCard key={service._id} service={service} />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Cleaning essentials"
            subtitle="Spotless spaces, effortlessly"
            icon={<FaBolt className="text-sm text-blue-500" />}
            loading={sectionState.cleaning.loading}
            error={sectionState.cleaning.error}
            seeAllLink="/category/cleaning"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.cleaning.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                cleaningServices.map((service) => (
                  <MobileServiceCard key={service._id} service={service} />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Appliance repair and services"
            subtitle="Expert fixes for all your appliances"
            icon={<FaBolt className="text-sm text-orange-500" />}
            loading={sectionState.appliance.loading}
            error={sectionState.appliance.error}
            seeAllLink="/category/appliance"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.appliance.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                applianceServices.map((service) => (
                  <MobileServiceCard key={service._id} service={service} />
                ))
              )}
            </div>
          </MobileSectionShell>

          <MobileSectionShell
            title="Home repair and services"
            subtitle="Quick fixes for a better home"
            icon={<FaBolt className="text-sm text-teal-500" />}
            loading={sectionState.homeRepair.loading}
            error={sectionState.homeRepair.error}
            seeAllLink="/category/home-repair"
          >
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {sectionState.homeRepair.loading ? (
                SERVICE_SKELETONS.map((_, idx) => (
                  <div key={idx} className="h-40 w-48 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
                ))
              ) : (
                homeRepairServices.map((service) => (
                  <MobileServiceCard key={service._id} service={service} />
                ))
              )}
            </div>
          </MobileSectionShell>
        </div>

        {/* Desktop Sections */}
        <section className="hidden mt-10 lg:block">
          <SectionShell
            title="Browse by category"
            subtitle="Jump straight to what you need"
            icon={<FaArrowRight className="text-sm" />}
            loading={categoryState.loading}
            error={categoryState.error}
            skeletonCount={CATEGORY_SKELETONS.length}
            layout="categories"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </SectionShell>
        </section>

        <section className="hidden mt-12 space-y-10 lg:block pb-20">
          <SectionShell
            title="Popular right now"
            subtitle="Most loved by customers"
            icon={<FaFire className="text-sm text-emerald-600" />}
            loading={sectionState.popular.loading}
            error={sectionState.popular.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={popular} variant="highlight" />
          </SectionShell>

          {/* Premium Banner - Desktop */}
          <div className="relative">
            <Link href="/book" className="block relative h-64 rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all">
              <Image
                src="/assets/WomenSalon.png"
                alt="Premium Services"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          <SectionShell
            title="Most booked services"
            subtitle="What everyone's booking right now"
            icon={<FaBolt className="text-sm text-emerald-600" />}
            loading={sectionState.mostBooked.loading}
            error={sectionState.mostBooked.error}
            skeletonCount={8}
          >
            <ServiceGrid services={mostBooked} />
          </SectionShell>

          <SectionShell
            title="Salon for Women"
            subtitle="Pamper yourself at home"
            icon={<FaStar className="text-sm text-pink-500" />}
            loading={sectionState.salon.loading}
            error={sectionState.salon.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={salonServices} />
          </SectionShell>

          <SectionShell
            title="Cleaning essentials"
            subtitle="Spotless spaces, effortlessly"
            icon={<FaBolt className="text-sm text-blue-500" />}
            loading={sectionState.cleaning.loading}
            error={sectionState.cleaning.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={cleaningServices} />
          </SectionShell>

          <SectionShell
            title="Appliance repair and services"
            subtitle="Expert fixes for all your appliances"
            icon={<FaBolt className="text-sm text-orange-500" />}
            loading={sectionState.appliance.loading}
            error={sectionState.appliance.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={applianceServices} />
          </SectionShell>

          <SectionShell
            title="Home repair and services"
            subtitle="Quick fixes for a better home"
            icon={<FaBolt className="text-sm text-teal-500" />}
            loading={sectionState.homeRepair.loading}
            error={sectionState.homeRepair.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={homeRepairServices} />
          </SectionShell>

          <SectionShell
            title="Trending bookings"
            subtitle="Climbing the charts this week"
            icon={<FaChartLine className="text-sm text-emerald-600" />}
            loading={sectionState.trending.loading}
            error={sectionState.trending.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={trending} />
          </SectionShell>

          <SectionShell
            title="Premium experiences"
            subtitle="Top-tier professionals for special care"
            icon={<FaCrown className="text-sm text-amber-500" />}
            loading={sectionState.premium.loading}
            error={sectionState.premium.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={premium} variant="premium" />
          </SectionShell>

          <SectionShell
            title="More to explore"
            subtitle="Handy picks across categories"
            icon={<FaArrowRight className="text-sm text-slate-700" />}
            loading={sectionState.other.loading}
            error={sectionState.other.error}
            skeletonCount={SERVICE_SKELETONS.length}
          >
            <ServiceGrid services={other} />
          </SectionShell>
        </section>

        <section className="hidden mt-14 rounded-2xl border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-sm sm:px-10 lg:block">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Why Vrober</p>
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl">Built for effortless bookings.</h3>
              <p className="text-sm text-emerald-50/90 sm:text-base">
                We combine verified experts, transparent pricing, and real-time updates so you always know what to expect.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[{
                label: 'Avg. response', value: '< 2 mins',
              }, {
                label: 'Happy customers', value: '50k+',
              }, {
                label: 'Cities served', value: '25+',
              }].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center shadow-inner backdrop-blur">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-emerald-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MobileAppHeader({ location, isLoading }) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="sticky top-0 z-40 flex lg:hidden items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      {/* Location */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800 min-w-0 flex-1">
        <FaLocationDot className={`text-xs flex-shrink-0 text-emerald-600 ${isLoading ? 'animate-pulse' : ''}`} />
        <span className="truncate">{isLoading ? 'Finding location…' : location || 'Select location'}</span>
      </div>

      {/* Cart Icon */}
      <Link
        href="/cart"
        className="relative flex-shrink-0 rounded-lg hover:bg-slate-100 p-2 transition-colors active:bg-slate-200"
      >
        <FaCartShopping className="text-lg text-slate-900" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-emerald-600 w-5 h-5 text-white text-xs font-bold">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}

function MobileSectionShell({ title, subtitle, icon, children, loading, error, seeAllLink }) {
  return (
    <div className="border-t border-slate-100 bg-white py-3">
      <div className="mb-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">{title}</span>
            {icon && <span className="text-emerald-600">{icon}</span>}
          </div>
          {seeAllLink && (
            <Link href={seeAllLink} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              See all
            </Link>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {loading && <p className="px-4 text-xs text-slate-500">Loading...</p>}
      {error && <p className="px-4 text-xs text-red-600">{error}</p>}
      {!loading && !error && children}
    </div>
  );
}

function MobileCategoryCard({ category }) {
  return (
    <Link
      href={`/category/${encodeURIComponent(category.name || category._id)}`}
      className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition-all active:scale-95"
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-slate-50 ring-1 ring-slate-100">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.displayName || category.name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-lg">{category.icon || '🔧'}</span>
        )}
      </div>
      <p className="text-center text-xs font-semibold text-slate-900 line-clamp-2">
        {category.displayName || category.name}
      </p>
    </Link>
  );
}

function MobileServiceCard({ service, variant }) {
  const { addToCart } = useCart();
  const badge = variant === 'highlight' ? { text: 'Popular', color: 'bg-emerald-500' } : null;

  return (
    <div className="group relative min-w-[180px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all active:scale-95">
      {badge && (
        <span className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-xs font-bold text-white shadow ${badge.color}`}>
          {badge.text}
        </span>
      )}
      <Link href={`/services/${service._id}`} className="block h-32 overflow-hidden bg-slate-100">
        <Image
          src={service.imageUrl || '/assets/placeholder.png'}
          alt={service.serviceName}
          width={200}
          height={160}
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </Link>
      <div className="p-3 space-y-2">
        <Link href={`/services/${service._id}`}>
          <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
            {service.serviceName}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-slate-900">₹{service.price || 0}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
            <FaStar className="text-xs" />
            {service.rating?.toFixed?.(1) || '4.6'}
          </span>
        </div>
        <button
          onClick={() => addToCart(service)}
          className="block w-full rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-bold text-white transition-colors hover:bg-slate-800 active:scale-95"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function MobileServiceRow({ service }) {
  const { addToCart } = useCart();

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all active:scale-95">
      <Link href={`/services/${service._id}`} className="shrink-0">
        <div className="h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={service.imageUrl || '/assets/placeholder.png'}
            alt={service.serviceName}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <Link href={`/services/${service._id}`} className="flex-1 min-w-0 space-y-1">
        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{service.serviceName}</h3>
        <p className="text-xs text-slate-600 line-clamp-1">{service.description || 'Professional service'}</p>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-900">₹{service.price || 0}</span>
          <FaStar className="text-amber-400" />
          <span className="font-semibold text-slate-700">{service.rating?.toFixed?.(1) || '4.6'}</span>
        </div>
      </Link>
      <button
        onClick={() => addToCart(service)}
        className="shrink-0 flex items-center justify-center rounded-lg bg-slate-900 px-2 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800 active:scale-95"
      >
        <FaCartShopping className="text-sm" />
      </button>
    </div>
  );
}

function LocationPill({ location, isLoading }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
      <FaLocationDot className={`text-sm ${isLoading ? 'animate-pulse' : ''}`} />
      <span className="truncate max-w-[200px]">{isLoading ? 'Fetching your location…' : location || 'Set your location'}</span>
    </div>
  );
}

function SectionShell({ title, subtitle, icon, children, loading, error, skeletonCount = 6, layout = 'services' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
          </div>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-slate-600"
        >
          Book now <FaArrowRight className="text-xs" />
        </Link>
      </div>

      <p className="mb-4 text-xs font-medium text-slate-500 sm:hidden">
        Swipe sideways to explore more {layout === 'categories' ? 'categories' : 'services'}.
      </p>

      {loading && (
        <div className={layout === 'categories' ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
          {(layout === 'categories' ? CATEGORY_SKELETONS : SERVICE_SKELETONS).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-xl border border-slate-100 bg-slate-50 p-4 shadow-inner">
              <div className={layout === 'categories' ? 'h-12 w-12 rounded-lg bg-slate-200' : 'h-40 w-full rounded-lg bg-slate-200'}></div>
              <div className="mt-3 h-3 w-2/3 rounded bg-slate-200"></div>
              {layout !== 'categories' && <div className="mt-2 h-3 w-1/2 rounded bg-slate-100"></div>}
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && children}
    </div>
  );
}

function ServiceGrid({ services, variant = 'default' }) {
  if (!services?.length) {
    return <p className="text-sm text-slate-500">No services found right now.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} variant={variant} />
      ))}
    </div>
  );
}

function ServiceCard({ service, variant }) {
  const { addToCart } = useCart();
  const badge = {
    highlight: { text: 'Popular', color: 'bg-emerald-500 text-white' },
    premium: { text: 'Premium', color: 'bg-amber-500 text-white' },
  }[variant];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {badge && (
        <span className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold shadow ${badge.color}`}>
          {badge.text}
        </span>
      )}
      <Link href={`/services/${service._id}`} className="block h-44 overflow-hidden bg-slate-100">
        <Image
          src={service.imageUrl || '/assets/placeholder.png'}
          alt={service.serviceName}
          width={600}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <Link href={`/services/${service._id}`}>
            <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-emerald-700">
              {service.serviceName}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm text-slate-600">
            {service.description || 'Professional service by verified experts.'}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-700">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-800">
            <FaStar className="text-amber-400" />
            <span>{service.rating?.toFixed?.(1) || service.rating || '4.6'}</span>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-slate-900">₹{service.price || 0}</p>
            <p className="text-xs text-slate-500">{service.duration || 'Flexible slots'}</p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(service)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <FaCartShopping className="text-xs" />
            Add to cart
          </button>
          <Link
            href={`/services/${service._id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <Link
      href={`/category/${encodeURIComponent(category.name || category._id)}`}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.displayName || category.name}
            width={48}
            height={48}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-xl">{category.icon || '🔧'}</span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">{category.displayName || category.name}</p>
        {category.description && (
          <p className="text-xs text-slate-500 line-clamp-1">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
