"use client";

import { useEffect, useState } from "react";
import { fetchServices, createBooking } from "@/lib/bookingService";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";

export default function Book() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const load = async () => {
      const data = await fetchServices();
      setServices(data);
      const params = new URLSearchParams(window.location.search);
      const sId = params.get("serviceId");
      if (sId) {
        const found = data.find((s) => String(s.id) === String(sId));
        if (found) selectService(found);
      }
    };
    load();
  }, []);

  const availableTimeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const selectService = (s) => {
    setServiceId(s.id);
    setVendorId(s.vendorId || "");
    setServiceName(s.name);
    setPrice(s.price || 0);
    setErrors((e) => ({ ...e, serviceId: "" }));
  };

  const submitBooking = async () => {
    const newErrors = {};
    if (!serviceId) newErrors.serviceId = "Select a service";
    if (!date) newErrors.date = "Pick a date";
    if (!time) newErrors.time = "Pick a time";
    if (!address) newErrors.address = "Enter address";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        vendorId,
        serviceId,
        serviceDate: date,
        serviceTime: time,
        address,
        location: {
          lat: lat ? Number(lat) : undefined,
          lng: lng ? Number(lng) : undefined,
        },
        price,
        description: serviceName,
        specialInstructions,
        paymentMethod,
      };
      await createBooking(payload);
      setShowConfirmation(true);
      setTimeout(() => {
        window.location.href = "/bookings";
      }, 2000);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => new Date().toISOString().split("T")[0];
  const getMaxDate = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-black">Book a Service</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Select Service *
              </label>
              <div className="max-h-72 overflow-y-auto border rounded-lg divide-y">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectService(s)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition ${
                      serviceId === s.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm">₹{s.price}</span>
                  </button>
                ))}
              </div>
              {errors.serviceId && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceId}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                <FaCalendarAlt className="inline mr-2" /> Date *
              </label>
              <input
                type="date"
                value={date}
                min={getMinDate()}
                max={getMaxDate()}
                onChange={(e) => setDate(e.target.value)}
                className={`input-premium ${errors.date && "border-red-500"}`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                <FaClock className="inline mr-2" /> Time *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-lg border px-2 py-2 text-sm ${
                      time === slot
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className={`input-premium ${errors.address && "border-red-500"}`}
                placeholder="Flat / Street / City"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-black">
                  Lat
                </label>
                <input
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="input-premium"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-black">
                  Lng
                </label>
                <input
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="input-premium"
                  placeholder="Optional"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
                className="input-premium"
                placeholder="Notes for vendor"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="input-premium"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
            <button
              type="button"
              onClick={submitBooking}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading
                ? "Booking..."
                : serviceId
                  ? `Confirm Booking (₹${price})`
                  : "Select a service"}
            </button>
          </div>
        </div>
        {showConfirmation && (
          <div className="mt-8 rounded-xl border p-8 text-center animate-fade-in bg-white">
            <FaCheckCircle className="mx-auto mb-4 text-5xl text-green-600" />
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
            <p className="text-sm text-gray-600">Redirecting to your bookings...</p>
          </div>
        )}
      </div>
    </div>
  );
}
