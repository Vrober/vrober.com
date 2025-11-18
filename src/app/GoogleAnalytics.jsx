'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 (GA4) Component
 *
 * Usage:
 * 1. Get your GA4 Measurement ID from https://analytics.google.com
 * 2. Add to .env.local: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 3. Import this component in layout.js
 *
 * Example:
 * import GoogleAnalytics from './GoogleAnalytics';
 *
 * <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
 */

export default function GoogleAnalytics({ measurementId }) {
  // Don't load in development
  if (process.env.NODE_ENV !== 'production' || !measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      {/* Initialize GA4 */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Track custom events
 *
 * Usage in your components:
 * import { trackEvent } from './GoogleAnalytics';
 *
 * trackEvent('button_click', {
 *   event_category: 'engagement',
 *   event_label: 'Book Now Button'
 * });
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Track page views manually
 * Useful for client-side navigation
 */
export function trackPageView(url) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}
