'use client';

import { useEffect, useState } from 'react';
import { fetchServices, createBooking } from '@/lib/bookingService';
import Image from 'next/image';
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStickyNote,
  FaSearch,
  FaChevronRight,
} from 'react-icons/fa';
import ProtectedRoute from '@/app/_components/ProtectedRoute';

function BookPage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');
  const [step, setStep] = useState(1); // Multi-step form: 1=Service, 2=DateTime, 3=Details

  useEffect(() => {
    const load = async () => {
      let data = [];
      try {
        const response = await fetchServices();
        data = Array.isArray(response) ? response : response?.data || [];
        setServices(Array.isArray(data) ? data : []);
        setErrorMessage('');
      } catch (err) {
        console.error('Failed to load services', err);
        setServices([]);
        setErrorMessage('Could not load services. Please try again.');
      }
      const params = new URLSearchParams(window.location.search);
      const sId = params.get('serviceId');
      const sName = params.get('serviceName');
      const sPrice = params.get('price');

      if (sId) {
        // If service details are passed via URL, use them directly
        if (sName && sPrice) {
          setServiceId(sId);
          setServiceName(decodeURIComponent(sName));
          setPrice(Number(sPrice) || 0);
          setErrors((e) => ({ ...e, serviceId: '' }));
          setStep(2); // Skip to date/time step
        } else {
          // Otherwise, find the service in the data
          const found = data.find((s) => String(s.id) === String(sId));
          if (found) {
            selectService(found);
            setStep(2);
          }
        }
      }
    };
    load();
  }, []);

  const availableTimeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  const selectService = (s) => {
    setServiceId(s.id);
    setVendorId(s.vendorId || '');
    setServiceName(s.name);
    setPrice(s.price || 0);
    setErrors((e) => ({ ...e, serviceId: '' }));
    setStep(2); // Move to next step after selection
  };

  const filteredServices = services.filter((s) =>
    s.name?.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      // Using Open Street Map Nominatim API for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data) {
        // Method 1: Use the display_name which has the full address string
        if (data.display_name) {
          return data.display_name;
        }
        
        // Method 2: Build from address components if display_name not available
        if (data.address) {
          const addr = data.address;
          const addressParts = [];
          
          // Add all available address components in order
          if (addr.house_number) addressParts.push(addr.house_number);
          if (addr.road) addressParts.push(addr.road);
          if (addr.residential) addressParts.push(addr.residential);
          if (addr.neighbourhood) addressParts.push(addr.neighbourhood);
          if (addr.suburb) addressParts.push(addr.suburb);
          if (addr.village) addressParts.push(addr.village);
          if (addr.town) addressParts.push(addr.town);
          if (addr.city) addressParts.push(addr.city);
          if (addr.county) addressParts.push(addr.county);
          if (addr.district) addressParts.push(addr.district);
          if (addr.state) addressParts.push(addr.state);
          if (addr.postcode) addressParts.push(addr.postcode);
          if (addr.country) addressParts.push(addr.country);
          
          const fullAddress = addressParts.join(', ');
          return fullAddress || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }
        
        return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      }
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      console.warn('Address lookup failed:', error);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  };

  const searchAddress = async (query) => {
    if (!query || query.length < 3) {
      setSearchSuggestions([]);
      return;
    }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSearchSuggestions(data.map(item => ({
          display_name: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        })));
        setShowSuggestions(true);
      }
    } catch (error) {
      console.warn('Address search failed:', error);
      setSearchSuggestions([]);
    }
  };

  const selectAddressFromSearch = (suggestion) => {
    setAddress(suggestion.display_name);
    setLat(suggestion.lat.toFixed(6));
    setLng(suggestion.lon.toFixed(6));
    setSearchSuggestions([]);
    setShowSuggestions(false);
    setLocationStatus('✓ Address selected!');
    setTimeout(() => setLocationStatus(''), 2000);
  };

  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationStatus('❌ Geolocation not supported on your browser');
      return;
    }
    setLocationStatus('📍 Fetching your location...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude.toFixed(6));
        setLng(longitude.toFixed(6));
        
        // Get detailed address from coordinates
        setLocationStatus('🔍 Getting address details...');
        const fullAddress = await getAddressFromCoordinates(latitude, longitude);
        setAddress(fullAddress);
        
        setLocationStatus('✓ Location found!');
        setTimeout(() => setLocationStatus(''), 3000); // Clear after 3s
      },
      (err) => {
        let msg = 'Unable to access location';
        if (err.code === 1) {
          msg = '⚠️ Location permission denied. Please enable in browser settings.';
        } else if (err.code === 2) {
          msg = '⚠️ Location unavailable. Check your network & GPS.';
        } else if (err.code === 3) {
          msg = '⚠️ Location request timed out. Try again.';
        }
        setLocationStatus(msg);
        console.warn('Geolocation:', msg, err.code);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5000 }
    );
  };

  const relatedServices = services
    .filter((s) => s.id !== serviceId)
    .slice(0, 3);

  const submitBooking = async () => {
    // Validation
    const newErrors = {};
    if (!serviceId) newErrors.serviceId = 'Select a service';
    if (!date) newErrors.date = 'Pick a date';
    if (!time) newErrors.time = 'Pick a time';
    if (!address) newErrors.address = 'Enter address';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        serviceId,
        vendorId: vendorId || undefined, // Optional - will be assigned by admin
        serviceDate: date,
        serviceTime: time,
        address,
        location: {
          lat: lat ? Number(lat) : undefined,
          lng: lng ? Number(lng) : undefined,
          manual: manualLocation || undefined,
        },
        price,
        description: serviceName,
        specialInstructions,
        paymentMethod,
      };

      // Log the payload for debugging
      console.log('Booking payload:', payload);

      await createBooking(payload);
      setShowConfirmation(true);
      setTimeout(() => {
        window.location.href = '/bookings';
      }, 2000);
    } catch (err) {
      console.error('Booking submission error:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to create booking';
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];
  const getMaxDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
  };

  const canProceedToStep2 = () => serviceId && serviceName;
  const canProceedToStep3 = () => canProceedToStep2() && date && time;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Service</h1>
          <p className="mt-2 text-gray-600">
            Professional services at your doorstep
          </p>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition ${
                  step >= 1
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                1
              </div>
              <span
                className={`hidden font-medium sm:inline ${step >= 1 ? 'text-black' : 'text-gray-500'}`}
              >
                Select Service
              </span>
            </div>
            <div className="h-0.5 w-12 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition ${
                  step >= 2
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                2
              </div>
              <span
                className={`hidden font-medium sm:inline ${step >= 2 ? 'text-black' : 'text-gray-500'}`}
              >
                Date & Time
              </span>
            </div>
            <div className="h-0.5 w-12 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition ${
                  step >= 3
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                3
              </div>
              <span
                className={`hidden font-medium sm:inline ${step >= 3 ? 'text-black' : 'text-gray-500'}`}
              >
                Details & Confirm
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search for a service..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>

            {/* Service Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.length > 0 ? (
                filteredServices.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectService(s)}
                    className={`group relative overflow-hidden rounded-xl border-2 bg-white p-5 text-left shadow-sm transition-all hover:shadow-lg ${
                      serviceId === s.id
                        ? 'border-black ring-2 ring-black/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Service Image */}
                    {s.imageUrl && (
                      <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={s.imageUrl}
                          alt={s.name}
                          width={300}
                          height={160}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Service Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {s.name}
                      </h3>
                      {s.description && (
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {s.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-black">
                          ₹{s.price}
                        </span>
                        {serviceId === s.id && (
                          <FaCheckCircle className="text-xl text-green-600" />
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-gray-500">
                    {serviceSearch
                      ? 'No services found matching your search'
                      : 'Loading services...'}
                  </p>
                </div>
              )}
            </div>

            {errors.serviceId && (
              <p className="text-center text-sm text-red-600">
                {errors.serviceId}
              </p>
            )}

            {/* Continue Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => canProceedToStep2() && setStep(2)}
                disabled={!canProceedToStep2()}
                className="flex items-center gap-2 rounded-xl bg-black px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Selected Service Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Selected Service</p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {serviceName}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-2xl font-bold text-black">₹{price}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 text-sm font-medium text-gray-600 hover:text-black"
              >
                ← Change Service
              </button>
            </div>

            {/* Date Selection */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <FaCalendarAlt className="text-black" />
                Select Date *
              </label>
              <input
                type="date"
                value={date}
                min={getMinDate()}
                max={getMaxDate()}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full rounded-lg border-2 px-4 py-3 text-lg transition focus:outline-none focus:ring-2 focus:ring-black/20 ${
                  errors.date
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-black'
                }`}
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            {/* Time Selection */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <FaClock className="text-black" />
                Select Time *
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-lg border-2 px-4 py-3 text-center font-semibold transition ${
                      time === slot
                        ? 'border-black bg-black text-white shadow-lg'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-2 text-sm text-red-600">{errors.time}</p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => canProceedToStep3() && setStep(3)}
                disabled={!canProceedToStep3()}
                className="flex items-center gap-2 rounded-xl bg-black px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details & Confirmation */}
        {step === 3 && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column: Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Address */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <FaMapMarkerAlt className="text-black" />
                  Service Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      searchAddress(e.target.value);
                    }}
                    onFocus={() =>
                      searchSuggestions.length > 0 && setShowSuggestions(true)
                    }
                    className={`w-full rounded-lg border-2 px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      errors.address
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Type your city, area, or full address..."
                  />
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-48 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-xl">
                      {searchSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectAddressFromSearch(suggestion)}
                          className="w-full border-b border-gray-100 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 last:border-b-0"
                        >
                          {suggestion.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}

                {/* Location Actions */}
                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    disabled={locationStatus.includes('Fetching')}
                    className="w-full rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 font-semibold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {locationStatus.includes('Fetching')
                      ? '⏳ Fetching location...'
                      : '📍 Use My Current Location'}
                  </button>
                  <p className="text-center text-xs text-gray-500">
                    💡 On desktop? Type your address above or enable location
                    access
                  </p>
                  {locationStatus && (
                    <p
                      className={`text-center text-sm font-medium ${
                        locationStatus.includes('✓')
                          ? 'text-green-600'
                          : locationStatus.includes('❌') ||
                              locationStatus.includes('⚠️')
                            ? 'text-orange-600'
                            : 'text-blue-600'
                      }`}
                    >
                      {locationStatus}
                    </p>
                  )}
                </div>

                {/* Additional Location Details */}
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Additional details (Optional)
                  </label>
                  <input
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="Landmark, Gate code, Floor, Apt number..."
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <FaStickyNote className="text-black" />
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Any special requirements or notes for the service provider..."
                />
              </div>

              {/* Payment Method */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <FaMoneyBillWave className="text-black" />
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`rounded-lg border-2 px-6 py-4 text-center font-semibold transition ${
                      paymentMethod === 'cash'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`rounded-lg border-2 px-6 py-4 text-center font-semibold transition ${
                      paymentMethod === 'online'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    💳 Online
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={submitBooking}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-3 font-bold text-white shadow-lg transition hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    '⏳ Processing...'
                  ) : (
                    <>
                      <FaCheckCircle />
                      Confirm Booking (₹{price})
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Booking Summary
                </h3>
                <div className="space-y-4 border-t border-gray-200 pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-semibold text-gray-900">{serviceName}</p>
                  </div>
                  {date && (
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold text-gray-900">{date}</p>
                    </div>
                  )}
                  {time && (
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-semibold text-gray-900">{time}</p>
                    </div>
                  )}
                  {address && (
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">
                        {address.length > 60
                          ? `${address.slice(0, 60)}...`
                          : address}
                      </p>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold text-black">₹{price}</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-gray-50"
                >
                  Change Service
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Booking Confirmed!
              </h2>
              <p className="mb-4 text-gray-600">
                Your service has been successfully booked.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to your bookings...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap with ProtectedRoute
export default function Book() {
  return (
    <ProtectedRoute>
      <BookPage />
    </ProtectedRoute>
  );
}
