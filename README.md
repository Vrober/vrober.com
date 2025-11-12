# VROBER Frontend (Next.js App Router)

## Overview
This frontend consumes the Vrober backend API (`http://localhost:8000/api/v1`) to render service discovery, booking flows, and user profile features. The application has been migrated from static placeholder data to fully dynamic API-driven components.

## Dynamic Home Sections
The following components now fetch live data:
- `PopularServices.jsx` → `/services/home-sections` (popular array)
- `MostBookedServices.jsx` → `/services/home-sections` (mostBooked array; powered by `Service.bookingCount` which increments on each booking)
- `PremiumServices.jsx` → `/services/home-sections` (premium array)
- `CleaningServices.jsx` → `/services?category=Cleaning`
- `SalonforWomen.jsx` → `/services?category=Grooming` (category naming aligned with seed data)
- `OtherServices.jsx` → `/services` (filters out popular/premium to show diversified remainder)
- `RecentBookings.jsx` → `/bookings/user` (requires auth cookie/JWT)
- `SearchBar.jsx` → `/services/suggestions?q=<text>` (debounced suggestions)

### Data Contract (Selected Fields)
Each service document provides:
```jsonc
{
	"_id": "string",
	"serviceName": "string",
	"category": "Cleaning | Grooming | Repair | ...",
	"price": number,
	"description": "string",
	"imageUrl": "string | null",
	"isPopular": boolean,
	"isPremium": boolean,
	"bookingCount": number
}
```

## Authentication Flow
The frontend expects a JWT delivered via the `/auth/authenticate` endpoint (OTP dev code: `6969`). The token is stored in an HTTP-only cookie; axios is configured (`src/lib/axios.js`) with `withCredentials: true` so protected routes like `/bookings/user` succeed.

## Environment Variables
Set `NEXT_PUBLIC_API_URL` if the backend runs on a non-default host/port; otherwise it falls back to `http://localhost:8000/api/v1`.

## Local Development
1. Start backend: from `backend/` run `npm run dev`.
2. Start frontend: from `frontend/` run `npm run dev`.
3. Authenticate: POST `phoneNumber` + `otp` to `/auth/authenticate` (dev OTP = `6969`).

## Adding New Home Sections
1. Extend backend `Service` schema or create aggregation logic in `serviceController.getHomeSections`.
2. Add the corresponding slice in the JSON response.
3. Create a new component that fetches from the same endpoint and selects the new slice.

## Booking Count Integrity
`bookingCount` increments on every successful booking creation (`bookingController.createBooking`). This feeds the `mostBooked` list. If historical data needs backfill, run a script summing bookings grouped by service and update each `Service` document.

## Scripts
Run `npm run seed:clean && npm run seed` inside `backend/` to refresh curated demo data (popular/premium/services).

## Future Enhancements
- Unified `/services/other` endpoint to offload client filtering logic.
- Category metadata (display names, icons) endpoint.
- Real OTP integration & rate limiting.
- Vendor/admin dashboards.

---
Generated: 2025-11-07 (dynamic migration completed)
