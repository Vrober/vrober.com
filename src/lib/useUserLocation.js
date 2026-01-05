'use client';
import { useState, useEffect } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

/**
 * Custom hook to get and track user's current location
 * Features:
 * - Auto-detects geolocation via browser
 * - Uses backend reverse-geocoding (more reliable than frontend)
 * - Fallback to IP-based location
 * - Caches location in localStorage
 * - Returns city, state code format (e.g., "Ranchi, JH")
 */
export default function useUserLocation() {
  const [location, setLocation] = useState({
    text: 'Detecting...',
    city: '',
    state: '',
    coords: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Try to get from localStorage first (cached)
    const cachedLocation = localStorage.getItem('userLocation');
    const cachedCoords = localStorage.getItem('userCoords');

    if (cachedLocation) {
      try {
        const coords = cachedCoords ? JSON.parse(cachedCoords) : null;
        const [city, state] = cachedLocation.split(', ');
        // Show cached immediately, but DO NOT return; we'll refresh below
        setLocation({
          text: cachedLocation,
          city: city || '',
          state: state || '',
          coords,
          isLoading: true,
          error: null,
        });
      } catch (e) {
        console.warn('Failed to parse cached location:', e);
      }
    }

    // Try to get current location via geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const coords = { lat: latitude, lng: longitude };

            // Use backend reverse-geocoding (more reliable)
            const response = await fetch(
              `${API_URL}/location/reverse-geocode?lat=${latitude}&lng=${longitude}`,
              { method: 'GET' }
            );

            if (!response.ok) {
              throw new Error(`Backend geocoding failed: ${response.status}`);
            }

            const data = await response.json();
            const locationText = data.location || 'Unknown';

            setLocation({
              text: locationText,
              city: data.city || 'Unknown',
              state: data.state || '',
              coords,
              isLoading: false,
              error: null,
            });

            // Cache for future use
            localStorage.setItem('userLocation', locationText);
            localStorage.setItem('userCoords', JSON.stringify(coords));
          } catch (error) {
            console.warn('Backend reverse-geocoding failed:', error);
            // Fallback to IP-based location
            fetchLocationFromIP(cachedLocation);
          }
        },
        (error) => {
          console.warn('Geolocation error:', error.code);
          // Fallback to IP-based location
          fetchLocationFromIP(cachedLocation);
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 300000, // Cache for 5 minutes
        }
      );
    } else {
      // No geolocation support, use IP fallback
      fetchLocationFromIP(cachedLocation);
    }

    async function fetchLocationFromIP(fallbackCached) {
      try {
        const response = await fetch(`${API_URL}/location/from-ip`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`IP lookup failed: ${response.status}`);
        }

        const data = await response.json();
        const locationText = data.location || fallbackCached || 'India';
        const [city, state] = locationText.split(', ');

        setLocation({
          text: locationText,
          city: city || locationText,
          state: state || '',
          coords: null,
          isLoading: false,
          error: null,
        });

        // Cache for future use
        localStorage.setItem('userLocation', locationText);
      } catch (error) {
        console.warn('IP-based location lookup failed:', error);
        // Final fallback to cached or default
        const fallback = fallbackCached || 'Ranchi, JH';
        const [city, state] = fallback.split(', ');

        setLocation({
          text: fallback,
          city: city || fallback,
          state: state || 'JH',
          coords: null,
          isLoading: false,
          error: 'Could not determine location',
        });
      }
    }
  }, []);

  return location;
}
