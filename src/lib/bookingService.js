/**
 * Booking Service API
 * All backend integration functions for the booking system
 * Replace the mock data with actual API calls when backend is ready
 */

// ==================== SERVICES ====================

/**
 * Fetch all available services
 * @returns {Promise} Array of service objects
 */
import api from './axios';

export const fetchServices = async () => {
  try {
    const response = await api.get('/services', { params: { limit: 50 } });
    // Map backend service shape to simplified frontend consumption
    return response.data.services.map((s) => ({
      id: s._id,
      name: s.serviceName,
      price: s.price || 0,
      duration: s.duration || '',
      description: s.description || '',
      vendorId: s.vendorId?._id,
      vendorName: s.vendorId?.name,
      rating: s.rating,
      imageUrl: s.imageUrl,
      serviceType: s.serviceType,
    }));
  } catch (error) {
    console.error(
      'Error fetching services (API). Falling back to empty list.',
      error
    );
    return [];
  }
};

/**
 * Fetch service details by ID
 * @param {number} serviceId - Service ID
 * @returns {Promise} Service object
 */
export const fetchServiceById = async (serviceId) => {
  try {
    const response = await api.get(`/services/${serviceId}`);
    const s = response.data.service;
    return {
      id: s._id,
      name: s.serviceName,
      price: s.price || 0,
      duration: s.duration || '',
      description: s.description || '',
      vendorId: s.vendorId?._id,
      vendorName: s.vendorId?.name,
      rating: s.rating,
      imageUrl: s.imageUrl,
      serviceType: s.serviceType,
      toolsRequired: s.toolsRequired || [],
      reviews: s.reviews || [],
    };
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    throw error;
  }
};

// ==================== LOCATIONS ====================

/**
 * Fetch all service center locations
 * @returns {Promise} Array of location objects
 */
export const fetchLocations = async () => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.get('/api/locations');
    // return response.data;

    // Mock data
    return [
      {
        id: 1,
        name: 'Downtown Center',
        address: '123 Main St, City',
        city: 'New York',
        zipCode: '10001',
        phone: '+1 (555) 123-4567',
        hours: '9 AM - 8 PM',
      },
      {
        id: 2,
        name: 'North Branch',
        address: '456 Oak Ave, City',
        city: 'New York',
        zipCode: '10002',
        phone: '+1 (555) 234-5678',
        hours: '9 AM - 8 PM',
      },
      {
        id: 3,
        name: 'South Plaza',
        address: '789 Pine Rd, City',
        city: 'New York',
        zipCode: '10003',
        phone: '+1 (555) 345-6789',
        hours: '9 AM - 8 PM',
      },
    ];
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

// ==================== TIME SLOTS ====================

/**
 * Fetch available time slots for a specific date and service
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {number} serviceId - Service ID
 * @returns {Promise} Array of available time slots
 */
export const fetchAvailableTimeSlots = async (date, serviceId) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.get('/api/time-slots', {
    //   params: { date, serviceId }
    // });
    // return response.data;

    // Mock data - In production, this would return only available slots
    // based on existing bookings
    const allSlots = [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
      '06:00 PM',
      '07:00 PM',
    ];

    // Simulate some slots being unavailable
    const unavailableSlots = ['11:00 AM', '03:00 PM'];
    return allSlots.filter((slot) => !unavailableSlots.includes(slot));
  } catch (error) {
    console.error('Error fetching time slots:', error);
    throw error;
  }
};

// ==================== BOOKINGS ====================

/**
 * Create a new booking
 * @param {Object} bookingData - Booking information
 * @returns {Promise} Created booking object with booking ID
 */
export const createBooking = async (bookingData) => {
  try {
    // Validate and clean the booking data before sending
    const cleanedData = {
      vendorId: bookingData.vendorId,
      serviceId: bookingData.serviceId,
      serviceDate: new Date(bookingData.serviceDate).toISOString(),
      serviceTime: bookingData.serviceTime,
      address: bookingData.address,
      location:
        bookingData.location &&
        bookingData.location.lat &&
        bookingData.location.lng
          ? {
              lat: Number(bookingData.location.lat),
              lng: Number(bookingData.location.lng),
            }
          : undefined,
      price: Number(bookingData.price) || 0,
      description: bookingData.description || '',
      specialInstructions: bookingData.specialInstructions || '',
      paymentMethod: bookingData.paymentMethod || 'cash',
    };

    // Remove undefined fields
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === undefined) {
        delete cleanedData[key];
      }
    });

    console.log('Sending booking data:', cleanedData);
    const response = await api.post('/bookings', cleanedData);
    console.log('Booking response:', response.data);
    return response.data.booking;
  } catch (error) {
    console.error('Error creating booking:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      bookingData,
    });
    throw error;
  }
};

/**
 * Fetch user's bookings
 * @param {string} userId - User ID (optional, uses session if not provided)
 * @returns {Promise} Array of booking objects
 */
export const fetchUserBookings = async () => {
  try {
    const response = await api.get('/bookings/user', { params: { limit: 50 } });
    const list = response.data.bookings || [];
    return list.map((b) => ({
      id: b._id,
      status: b.status,
      serviceName: b.serviceId?.serviceName,
      serviceType: b.serviceId?.serviceType,
      vendorName: b.vendorId?.name,
      date: b.serviceDate,
      time: b.serviceTime,
      price: b.price,
      address: b.address,
      rating: b.rating,
      review: b.review,
      createdAt: b.createdAt,
    }));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

/**
 * Fetch booking details by ID
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Booking object
 */
export const fetchBookingById = async (bookingId) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.get(`/api/bookings/${bookingId}`);
    // return response.data;

    // Mock data
    return null;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

/**
 * Cancel a booking
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Cancellation confirmation
 */
export const cancelBooking = async (bookingId, cancellationReason = '') => {
  try {
    const response = await api.put(`/bookings/${bookingId}/cancel`, {
      cancellationReason,
    });
    return response.data;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

/**
 * Reschedule a booking
 * @param {string} bookingId - Booking ID
 * @param {Object} newSchedule - New date and time
 * @returns {Promise} Updated booking object
 */
export const rescheduleBooking = async (bookingId, newSchedule) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.put(`/api/bookings/${bookingId}/reschedule`, newSchedule);
    // return response.data;

    // Mock response
    return {
      success: true,
      message: 'Booking rescheduled successfully',
      data: newSchedule,
    };
  } catch (error) {
    console.error('Error rescheduling booking:', error);
    throw error;
  }
};

// ==================== VENDOR BOOKINGS ====================

export const fetchVendorBookings = async () => {
  try {
    const response = await api.get('/bookings/vendor', {
      params: { limit: 50 },
    });
    const list = response.data.bookings || [];
    return list.map((b) => ({
      id: b._id,
      status: b.status,
      userName: b.userId?.name,
      serviceName: b.serviceId?.serviceName,
      date: b.serviceDate,
      time: b.serviceTime,
      price: b.price,
      address: b.address,
      createdAt: b.createdAt,
    }));
  } catch (error) {
    console.error('Error fetching vendor bookings:', error);
    return [];
  }
};

export const acceptVendorBooking = async (bookingId, vendorNotes = '') => {
  try {
    const response = await api.put(`/bookings/${bookingId}/accept`, {
      vendorNotes,
    });
    return response.data;
  } catch (error) {
    console.error('Error accepting booking:', error);
    throw error;
  }
};

export const rejectVendorBooking = async (
  bookingId,
  cancellationReason = ''
) => {
  try {
    const response = await api.put(`/bookings/${bookingId}/reject`, {
      cancellationReason,
    });
    return response.data;
  } catch (error) {
    console.error('Error rejecting booking:', error);
    throw error;
  }
};

export const completeVendorBooking = async (bookingId) => {
  try {
    const response = await api.put(`/bookings/${bookingId}/complete`);
    return response.data;
  } catch (error) {
    console.error('Error completing booking:', error);
    throw error;
  }
};

// ==================== PAYMENTS ====================

/**
 * Initiate payment for a booking
 * @param {Object} paymentData - Payment information
 * @returns {Promise} Payment session/gateway URL
 */
export const initiatePayment = async (paymentData) => {
  try {
    // TODO: Uncomment when backend is ready
    // This will typically integrate with payment gateways like:
    // - Razorpay (India)
    // - Stripe (International)
    // - PayPal
    // - Paytm

    // const response = await api.post('/api/payments/initiate', paymentData);
    // return response.data;

    // Mock response
    // In production, this would return a payment gateway URL or session
    return {
      success: true,
      paymentId: `PAY${Date.now().toString().slice(-8)}`,
      gatewayUrl: 'https://payment-gateway.example.com/checkout',
      sessionId: 'mock_session_id',
      message: 'Payment initiated successfully',
    };
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

/**
 * Verify payment status
 * @param {string} paymentId - Payment ID
 * @returns {Promise} Payment verification result
 */
export const verifyPayment = async (paymentId) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.get(`/api/payments/${paymentId}/verify`);
    // return response.data;

    // Mock response
    return {
      success: true,
      status: 'completed',
      paymentId: paymentId,
      message: 'Payment verified successfully',
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

/**
 * Process refund for a cancelled booking
 * @param {string} bookingId - Booking ID
 * @returns {Promise} Refund status
 */
export const processRefund = async (bookingId) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.post(`/api/payments/refund`, { bookingId });
    // return response.data;

    // Mock response
    return {
      success: true,
      refundId: `REF${Date.now().toString().slice(-8)}`,
      message: 'Refund initiated successfully',
      estimatedDays: '5-7 business days',
    };
  } catch (error) {
    console.error('Error processing refund:', error);
    throw error;
  }
};

// ==================== VALIDATION ====================

/**
 * Validate address using geocoding API
 * @param {Object} address - Address object
 * @returns {Promise} Validation result with coordinates
 */
export const validateAddress = async (address) => {
  try {
    // TODO: Uncomment when backend is ready
    // This could integrate with Google Maps API or similar
    // const response = await api.post('/api/validate-address', address);
    // return response.data;

    // Mock response
    return {
      valid: true,
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
      formattedAddress: `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`,
    };
  } catch (error) {
    console.error('Error validating address:', error);
    throw error;
  }
};

/**
 * Check service availability in a specific area
 * @param {string} zipCode - ZIP code
 * @returns {Promise} Availability status
 */
export const checkServiceAvailability = async (zipCode) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.get(`/api/availability/zipcode/${zipCode}`);
    // return response.data;

    // Mock response
    return {
      available: true,
      message: 'Service available in your area',
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

// ==================== NOTIFICATIONS ====================

/**
 * Send booking confirmation email
 * @param {Object} bookingDetails - Booking information
 * @returns {Promise} Email send status
 */
export const sendBookingConfirmation = async (bookingDetails) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.post('/api/notifications/booking-confirmation', bookingDetails);
    // return response.data;

    // Mock response
    return {
      success: true,
      message: 'Confirmation email sent successfully',
    };
  } catch (error) {
    console.error('Error sending confirmation:', error);
    throw error;
  }
};

/**
 * Send booking reminder SMS
 * @param {string} bookingId - Booking ID
 * @returns {Promise} SMS send status
 */
export const sendBookingReminder = async (bookingId) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.post(`/api/notifications/reminder/${bookingId}`);
    // return response.data;

    // Mock response
    return {
      success: true,
      message: 'Reminder sent successfully',
    };
  } catch (error) {
    console.error('Error sending reminder:', error);
    throw error;
  }
};

// ==================== PROMO CODES ====================

/**
 * Validate and apply promo code
 * @param {string} promoCode - Promo code
 * @param {number} amount - Order amount
 * @returns {Promise} Discount details
 */
export const applyPromoCode = async (promoCode, amount) => {
  try {
    // TODO: Uncomment when backend is ready
    // const response = await api.post('/api/promo/apply', { promoCode, amount });
    // return response.data;

    // Mock response
    return {
      valid: true,
      discount: 50,
      discountType: 'fixed', // or 'percentage'
      finalAmount: amount - 50,
      message: 'Promo code applied successfully',
    };
  } catch (error) {
    console.error('Error applying promo code:', error);
    throw error;
  }
};

const bookingApi = {
  // Services
  fetchServices,
  fetchServiceById,

  // Locations
  fetchLocations,

  // Time Slots
  fetchAvailableTimeSlots,

  // Bookings
  createBooking,
  fetchUserBookings,
  fetchBookingById,
  cancelBooking,
  rescheduleBooking,
  fetchVendorBookings,
  acceptVendorBooking,
  rejectVendorBooking,
  completeVendorBooking,

  // Payments
  initiatePayment,
  verifyPayment,
  processRefund,

  // Validation
  validateAddress,
  checkServiceAvailability,

  // Notifications
  sendBookingConfirmation,
  sendBookingReminder,

  // Promo
  applyPromoCode,
};

export default bookingApi;
