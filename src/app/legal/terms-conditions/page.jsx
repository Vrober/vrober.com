import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions - Vrober',
  description: 'Terms and conditions for using Vrober platform and services',
};

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <div className="space-y-1 text-gray-600">
            <p>
              <strong>Last Updated:</strong> 20th November, 2025
            </p>
            <p>
              <strong>Legal Entity:</strong> Vrober
            </p>
            <p>
              <strong>Registered Address:</strong> Saketpuri, Ward No. 7, Godda,
              Jharkhand – 814133
            </p>
            <p>
              <strong>Support Email:</strong> support@vrober.com
            </p>
            <p>
              <strong>Support Number:</strong> +91 7903784438
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-blue-800">
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your use
              of the Vrober application, website, and related services
              (&quot;Platform&quot;). By using Vrober, you agree to be bound by
              these Terms.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              1. Definitions
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                <strong>&quot;User&quot; / &quot;Customer&quot;</strong> –
                Person booking a service.
              </p>
              <p>
                <strong>
                  &quot;Vendor&quot; / &quot;Service Provider&quot;
                </strong>{' '}
                – Skilled individual offering services via Vrober.
              </p>
              <p>
                <strong>&quot;Platform&quot;</strong> – Vrober&apos;s app,
                website, dashboard &amp; communication channels.
              </p>
              <p>
                <strong>&quot;Booking&quot;</strong> – A confirmed service
                request.
              </p>
              <p>
                <strong>&quot;Service Fee&quot;</strong> – Amount paid by user
                for the service.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              2. Platform Role
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                Vrober is a service aggregator that connects users with
                independent vendors.
              </p>
              <p>Vrober does not employ vendors directly.</p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              3. User Obligations
            </h2>
            <p className="mb-2">Users agree to:</p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>Provide accurate personal information</li>
              <li>Maintain respectful behavior with vendors</li>
              <li>Ensure availability at the service location</li>
              <li>Not misuse, threaten, or engage in fraudulent bookings</li>
              <li>Pay applicable charges for cancellations or vendor visits</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              4. Vendor Obligations
            </h2>
            <p className="mb-2">Vendors must:</p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>Provide accurate details during onboarding</li>
              <li>Maintain professionalism and hygiene</li>
              <li>Reach on time for assigned bookings</li>
              <li>Not solicit Vrober customers privately</li>
              <li>
                Not cancel bookings without valid reason (penalty applicable)
              </li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              5. Pricing & Payments
            </h2>
            <div className="mb-6 space-y-2">
              <p>All prices are listed within the app.</p>
              <p>Vrober reserves the right to modify pricing anytime.</p>
              <p>Payments are processed securely via Cashfree.</p>
              <p>Vendor payouts occur every 3 days via UPI/Bank/Card.</p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              6. Cancellation, Refund & Reschedule
            </h2>
            <div className="mb-6 space-y-2">
              <p>Governed strictly under separate policies.</p>
              <p>
                <Link
                  href="/legal/cancellation-policy"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View Cancellation Policy
                </Link>
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              7. Commission & Charges
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                Vrober charges vendors 20% to 30% commission per completed
                order.
              </p>
              <p>Minimum commission: ₹20 per order.</p>
              <p>Vendor cancellation penalty may apply.</p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              8. Safety & Liability
            </h2>
            <div className="mb-6 space-y-2">
              <p>Vrober verifies vendors using Aadhaar + photo.</p>
              <p className="font-semibold">Vrober is not liable for:</p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>Misconduct by vendors</li>
                <li>Damage caused during service</li>
                <li>Loss of items during service</li>
              </ul>
              <p>
                Vrober may assist in disputes but is not responsible for direct
                losses.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              9. Termination
            </h2>
            <p className="mb-2">
              Vrober may suspend or terminate any account due to:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>Fraud</li>
              <li>Threatening behavior</li>
              <li>Policy violations</li>
              <li>Repeated cancellations</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              10. Governing Law
            </h2>
            <p className="mb-6">
              These Terms are governed by the Laws of India, including the IT
              Act 2000 and DPDP Act 2023.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-12 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Need Help?</h3>
            <p className="mb-4 text-gray-600">
              If you have any questions about these Terms & Conditions, please
              contact us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> support@vrober.com
              </p>
              <p>
                <strong>Phone:</strong> +91 7903784438
              </p>
              <p>
                <strong>Address:</strong> Saketpuri, Ward No. 7, Godda,
                Jharkhand – 814133
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to Home
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
