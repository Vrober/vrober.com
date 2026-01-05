import Link from 'next/link';

export const metadata = {
  title: 'Partner Agreement - Vrober',
  description:
    'Service Partner Agreement terms for vendors and service providers on Vrober platform',
};

export default function PartnerAgreement() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Service Partner Agreement
          </h1>
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-blue-800">
              This Service Partner Agreement (&quot;Agreement&quot;) is made
              between Vrober and the Service Partner who registers on the Vrober
              platform. By joining the Vrober platform, the Service Partner
              acknowledges and agrees to these terms.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              1. Professional Service Quality
            </h2>
            <p className="mb-2">The Service Partner agrees to:</p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>
                Maintain high standards of professionalism, hygiene, and
                behavior
              </li>
              <li>Arrive on time for every booking</li>
              <li>Deliver services as described in the app</li>
              <li>
                Follow Vrober&apos;s pricing structure and service guidelines
              </li>
              <li>Not charge any extra amount outside the Vrober system</li>
              <li>Use safe tools, materials, and practices</li>
            </ul>
            <div className="mb-6 rounded-lg bg-yellow-50 p-4">
              <p className="font-medium text-yellow-800">
                ⚠️ Repeated complaints may result in suspension or permanent
                removal.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              2. Commission & Earnings
            </h2>
            <div className="mb-6 space-y-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-green-50 p-4">
                  <h3 className="mb-2 font-bold text-green-800">
                    Commission Structure
                  </h3>
                  <ul className="space-y-1 text-green-700">
                    <li>• Platform commission: 20%–30%</li>
                    <li>• Minimum commission per job: ₹20</li>
                    <li>• Payout frequency: Every 3 days</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-blue-800">
                    Payment Options
                  </h3>
                  <ul className="space-y-1 text-blue-700">
                    <li>• UPI Transfer</li>
                    <li>• Bank Transfer</li>
                    <li>• Card Settlement</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p>• Service Partners can track all earnings inside the app</p>
                <p>
                  • Under no circumstance should a Service Partner demand cash
                  outside Vrober
                </p>
                <p>
                  • Vrober may adjust commission rates with prior notification
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              3. Cancellations & Penalties
            </h2>
            <div className="mb-6 space-y-4">
              <p>Service Partner must avoid unnecessary cancellations.</p>
              <div className="rounded-lg bg-red-50 p-4">
                <h3 className="mb-2 font-bold text-red-800">
                  Penalties apply for:
                </h3>
                <ul className="list-inside list-disc space-y-1 text-red-700">
                  <li>Cancelling a job after accepting it</li>
                  <li>Not reaching the customer after confirmation</li>
                  <li>Repeated delays or unprofessional conduct</li>
                </ul>
                <p className="mt-2 font-medium text-red-800">
                  Multiple violations may lead to temporary suspension or
                  permanent contract termination.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              4. Code of Conduct
            </h2>
            <p className="mb-2">The Service Partner agrees to:</p>
            <ul className="mb-4 list-inside list-disc space-y-1">
              <li>Behave respectfully with customers and their families</li>
              <li>Not solicit customers privately outside the app</li>
              <li>
                Not exchange personal contact details for outside bookings
              </li>
              <li>
                Not consume alcohol or substances before or during service
              </li>
              <li>Not threaten, argue, or misbehave with customers</li>
            </ul>
            <div className="mb-6 rounded-lg bg-red-50 p-4">
              <p className="font-medium text-red-800">
                🚨 Any misconduct will result in immediate removal.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              5. Background Verification
            </h2>
            <div className="mb-6 space-y-4">
              <p>Service Partners must provide:</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-800">
                    Required Documents
                  </h3>
                  <ul className="space-y-1">
                    <li>✓ Aadhaar Card</li>
                    <li>✓ Profile Photo</li>
                    <li>✓ Bank Details</li>
                    <li>✓ Updated contact information</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-blue-800">
                    Additional Verification
                  </h3>
                  <p className="text-blue-700">
                    May be requested for sensitive categories like home
                    cleaning, salon, beauty, or technician-based services.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              6. Liability
            </h2>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-orange-50 p-4">
                <h3 className="mb-2 font-bold text-orange-800">
                  Service Partners are fully responsible for:
                </h3>
                <ul className="list-inside list-disc space-y-1 text-orange-700">
                  <li>The quality of their workmanship</li>
                  <li>Damages caused due to negligence</li>
                  <li>Missing, lost, or broken items during service</li>
                  <li>Maintaining their own tools, cosmetics, or equipment</li>
                </ul>
              </div>
              <p className="text-gray-600 italic">
                Vrober is an aggregator and is not liable for damages or losses
                caused by the Service Partner.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              7. Termination of Contract
            </h2>
            <div className="mb-6 space-y-4">
              <p>Vrober may terminate this Agreement if:</p>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Repeated cancellations occur</li>
                <li>Fraudulent or unethical activity is detected</li>
                <li>Customer complaints indicate consistent poor service</li>
                <li>Misconduct, verbal abuse, or unsafe behavior occurs</li>
                <li>Violation of platform rules continues after warnings</li>
              </ul>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="font-medium text-red-800">
                  ⚠️ Termination may be immediate without notice in severe
                  cases.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              8. Acceptance
            </h2>
            <div className="mb-6 rounded-lg bg-green-50 p-6">
              <p className="font-medium text-green-800">
                By onboarding, the Service Partner confirms they have read and
                understood this Agreement and voluntarily agree to all terms.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 rounded-lg bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-bold text-blue-900">
              Ready to Join as a Service Partner?
            </h3>
            <p className="mb-4 text-blue-800">
              Start earning with Vrober today. Join thousands of service
              partners who trust our platform.
            </p>
            <Link
              href="/partner"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Become a Partner
            </Link>
          </div>

          {/* Contact Section */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Questions about Partnership?
            </h3>
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
              href="/legal/privacy-policy"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Privacy Policy
            </Link>
            <Link
              href="/legal/cancellation-policy"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              Cancellation Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
