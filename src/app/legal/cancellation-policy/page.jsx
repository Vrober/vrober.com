import Link from 'next/link';

export const metadata = {
  title: 'Cancellation Policy - Vrober',
  description: 'Cancellation and refund policy for Vrober platform services',
};

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Cancellation Policy
          </h1>
          <div className="space-y-1 text-gray-600">
            <p>
              <strong>Last Updated:</strong> 20th November, 2025
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-orange-50 p-4">
            <p className="text-orange-800">
              This policy outlines the cancellation and refund terms for
              services booked through the Vrober platform.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              1. User Cancellations
            </h2>
            <p className="mb-4">Users may cancel bookings anytime. However:</p>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="mb-2 font-bold text-green-800">
                  ✅ FREE Cancellation
                </h3>
                <p className="text-green-700">
                  If vendor has NOT started traveling
                </p>
              </div>
              <div className="rounded-lg bg-orange-50 p-4">
                <h3 className="mb-2 font-bold text-orange-800">
                  💰 Travel Charges Apply
                </h3>
                <p className="text-orange-700">
                  If vendor has STARTED traveling
                </p>
                <p className="mt-1 text-sm text-orange-600">
                  Amount: Vendor visiting/travel charge (as per category)
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              2. Vendor-Initiated Cancellations
            </h2>
            <div className="mb-6 space-y-4">
              <p>If a vendor cancels without valid reason:</p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>Penalty applies to the vendor</li>
                <li>Vendor ranking may drop</li>
              </ul>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="font-medium text-red-800">
                  ⚠️ Repeated cancellations may lead to temporary or permanent
                  suspension.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              3. Rescheduling
            </h2>
            <div className="mb-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-blue-800">
                    Free Rescheduling
                  </h3>
                  <p className="text-blue-700">Before vendor travel begins</p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <h3 className="mb-2 font-bold text-yellow-800">
                    Rescheduling Fee
                  </h3>
                  <p className="text-yellow-700">After vendor starts travel</p>
                  <p className="mt-1 text-sm text-yellow-600">
                    Fee = Travel charge
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Refund Policy
            </h2>

            <h3 className="mb-3 text-xl font-bold text-green-800">
              ✅ Refunds ARE Applicable:
            </h3>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="mb-2 font-bold text-green-800">
                  A) Wrong Service Delivered
                </h4>
                <p className="text-green-700">Full refund or free rework</p>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="mb-2 font-bold text-green-800">
                  B) Vendor Didn&apos;t Arrive
                </h4>
                <p className="text-green-700">Full refund</p>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="mb-2 font-bold text-green-800">
                  C) No Work Started
                </h4>
                <p className="text-green-700">
                  Full refund only if NO work has been started
                </p>
                <p className="text-sm text-green-600">
                  Note: Vendor arrival but no work → travel charges apply
                </p>
              </div>
            </div>

            <h3 className="mb-3 text-xl font-bold text-red-800">
              ❌ Refunds NOT Applicable:
            </h3>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-red-50 p-4">
                <h4 className="mb-2 font-bold text-red-800">
                  G) After Service Completion
                </h4>
                <p className="text-red-700">
                  Once a service is completed, no refund will be issued
                </p>
              </div>

              <div className="rounded-lg bg-red-50 p-4">
                <h4 className="mb-2 font-bold text-red-800">
                  E) Customer Changed Mind Late
                </h4>
                <p className="text-red-700">
                  If customer cancels after vendor arrival:
                </p>
                <p className="text-sm text-red-600">
                  Vendor visiting fee is charged
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Partial Refunds
            </h2>
            <div className="mb-6 space-y-4">
              <p>If service quality is poor, Vrober may offer:</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <h4 className="font-bold text-blue-800">Partial Refund</h4>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <h4 className="font-bold text-green-800">Free Rework</h4>
                </div>
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <h4 className="font-bold text-purple-800">
                    Replacement Vendor
                  </h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                Decision depends on internal investigation.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Refund Timeline
            </h2>
            <div className="mb-6 rounded-lg bg-blue-50 p-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">⏰</div>
                <div>
                  <h3 className="text-xl font-bold text-blue-800">
                    3–7 Working Days
                  </h3>
                  <p className="text-blue-700">
                    Refunds processed after approval
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              How to Request Cancellation/Refund
            </h2>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 text-lg font-bold text-gray-800">
                  Contact Methods:
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>📧 Email:</strong> support@vrober.com
                  </p>
                  <p>
                    <strong>📞 Phone:</strong> +91 7903784438
                  </p>
                  <p>
                    <strong>📱 In-App:</strong> Use the cancellation option in
                    your booking
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Important Notes
            </h2>
            <div className="mb-6 rounded-lg bg-yellow-50 p-4">
              <ul className="list-inside list-disc space-y-1 text-yellow-800">
                <li>All cancellation requests are subject to verification</li>
                <li>
                  Refund decisions are at Vrober&apos;s discretion based on
                  investigation
                </li>
                <li>Travel charges vary by service category and distance</li>
                <li>For disputes, Vrober&apos;s decision will be final</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Need Help with Cancellation?
            </h3>
            <p className="mb-4 text-gray-600">
              Our support team is here to help you with cancellations and
              refunds.
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
              href="/legal/partner-agreement"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Partner Agreement
            </Link>
            <Link
              href="/legal/user-agreement"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              User Agreement →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
