import Link from 'next/link';

export const metadata = {
  title: 'User Agreement - Vrober',
  description:
    'User Agreement outlining rights and responsibilities for customers using Vrober platform',
};

export default function UserAgreement() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            User Agreement
          </h1>
          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <p className="text-green-800">
              This User Agreement outlines your rights and responsibilities
              while using the Vrober platform (&quot;Platform&quot;). By using
              our services, you agree to these terms.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              1. User Information and Responsibility
            </h2>
            <p className="mb-2">Users must:</p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>
                Provide accurate name, phone, address, and service details
              </li>
              <li>Ensure availability at the given address</li>
              <li>Behave respectfully with Service Partners</li>
              <li>Secure valuables before service begins</li>
              <li>Not misuse or book fake services</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              2. Respect & Safety
            </h2>
            <div className="mb-6 space-y-4">
              <p>Users agree to:</p>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>Treat all Service Partners respectfully</li>
                <li>Not behave abusively, threateningly, or inappropriately</li>
                <li>
                  Ensure a safe working environment for the Service Partner
                </li>
                <li>
                  Not ask Service Partners to perform illegal or unsafe tasks
                </li>
              </ul>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="font-medium text-red-800">
                  ⚠️ Any misuse may result in permanent account suspension.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              3. Service Charges & Payment
            </h2>
            <div className="mb-6 space-y-4">
              <p>Users agree to:</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-blue-800">
                    Regular Charges
                  </h3>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Pay service charges as listed in the app</li>
                    <li>• Secure payment via Cashfree</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-orange-50 p-4">
                  <h3 className="mb-2 font-bold text-orange-800">
                    Additional Charges
                  </h3>
                  <ul className="space-y-1 text-orange-700">
                    <li>
                      • Travel charge if canceled after partner starts traveling
                    </li>
                    <li>
                      • Visiting fee if mind changed after partner arrives
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              4. Cancellation Rules
            </h2>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="mb-2 font-bold text-green-800">
                  ✅ FREE Cancellation
                </h3>
                <p className="text-green-700">Before travel starts</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-4">
                <h3 className="mb-2 font-bold text-orange-800">
                  💰 Travel Charge Applies
                </h3>
                <p className="text-orange-700">
                  After Service Partner starts travelling
                </p>
                <p className="mt-1 text-sm text-orange-600">
                  Rescheduling follows the same rule
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              5. No Misuse of Service Partners
            </h2>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-red-50 p-4">
                <h3 className="mb-2 font-bold text-red-800">
                  🚫 Users must NOT:
                </h3>
                <ul className="list-inside list-disc space-y-1 text-red-700">
                  <li>Ask for personal phone numbers</li>
                  <li>Try to bypass the app for direct service</li>
                  <li>Threaten or mistreat Service Partners</li>
                </ul>
                <p className="mt-2 font-medium text-red-800">
                  Any report of this will result in immediate action.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              6. Service Completion Rules
            </h2>
            <div className="mb-6 space-y-4">
              <div className="mb-4 rounded-lg bg-red-50 p-4">
                <h3 className="mb-2 font-bold text-red-800">❌ No Refund</h3>
                <p className="text-red-700">After service is fully completed</p>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="mb-2 font-bold text-green-800">
                  ✅ Refund Available If:
                </h3>
                <ul className="list-inside list-disc space-y-1 text-green-700">
                  <li>Wrong service delivered</li>
                  <li>Service Partner did not arrive</li>
                  <li>No work was done (full refund except travel charge)</li>
                </ul>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              7. Disputes & Resolution
            </h2>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-bold text-blue-800">
                  Resolution Process
                </h3>
                <p className="mb-2 text-blue-700">
                  If there is an issue, users must contact Vrober Support first.
                </p>
                <p className="text-blue-700">
                  Disputes will be handled as per the laws of India.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              8. Liability Limitation
            </h2>
            <div className="mb-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-3 text-gray-800">
                  Vrober is a platform connecting users to independent Service
                  Partners.
                </p>
                <h3 className="mb-2 font-bold text-gray-800">
                  Vrober does not guarantee:
                </h3>
                <ul className="list-inside list-disc space-y-1 text-gray-700">
                  <li>Behavior or actions of Service Partners</li>
                  <li>Damage-free outcomes</li>
                  <li>100% punctuality</li>
                </ul>
                <p className="mt-3 text-gray-700 italic">
                  However, Vrober will always attempt to resolve disputes
                  fairly.
                </p>
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              9. Data Usage
            </h2>
            <div className="mb-6 space-y-4">
              <p>Users agree that Vrober may use their data for:</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h3 className="mb-2 font-bold text-blue-800">
                    Service Operations
                  </h3>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Booking management</li>
                    <li>• Assigning Service Partners</li>
                    <li>• Safety tracking</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 font-bold text-purple-800">
                    Communication & Security
                  </h3>
                  <ul className="space-y-1 text-purple-700">
                    <li>• Notifications</li>
                    <li>• Verification and security</li>
                    <li>• Customer support</li>
                  </ul>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 italic">
                Data is stored as per the
                <Link
                  href="/legal/privacy-policy"
                  className="text-blue-600 underline"
                >
                  {' '}
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              10. Acceptance
            </h2>
            <div className="mb-6 rounded-lg bg-green-50 p-6">
              <p className="font-medium text-green-800">
                By booking a service, the user agrees to all terms in this
                Agreement.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-blue-900">
                Ready to Book a Service?
              </h3>
              <p className="mb-4 text-blue-800">
                Explore our wide range of home services and book instantly.
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Browse Services
              </Link>
            </div>

            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Need Support?
              </h3>
              <p className="mb-4 text-gray-600">
                Our customer support team is here to help you.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Questions about this Agreement?
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
              href="/legal/cancellation-policy"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Cancellation Policy
            </Link>
            <Link
              href="/legal/terms-conditions"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              Terms & Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
