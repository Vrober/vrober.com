import api from './axios';

/**
 * Send OTP to the provided phone number
 * @param {string} phoneNumber - 10 digit phone number
 * @returns {Promise} - Returns OTP (in dev mode for testing)
 */
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await api.post('/auth/send-otp', { phoneNumber });
    return {
      success: response.data.success,
      message: response.data.message,
      otp: response.data.data?.otp, // Only in development
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
};

/**
 * Verify OTP and authenticate user (login or register)
 * @param {string} phoneNumber - 10 digit phone number
 * @param {string} otp - OTP entered by user
 * @returns {Promise} - Returns authentication status, token, and user data
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await api.post('/auth/authenticate', { phoneNumber, otp });
    if (response.data.success) {
      const { accessToken, user } = response.data.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
      }
      return {
        success: true,
        message: response.data.message,
        token: accessToken,
        user,
      };
    }
    throw new Error('Authentication failed');
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error(error.response?.data?.message || 'Failed to verify OTP');
  }
};

/**
 * Logout user
 * @returns {Promise}
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    throw new Error('Failed to logout');
  }
};

/**
 * Get current user from localStorage
 * @returns {Object|null} - User object or null
 */
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('accessToken');
  }
  return false;
};
