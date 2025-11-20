import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions - Vrober',
  description: 'Terms and conditions for using Vrober platform and services',
};

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <div className="text-gray-600 space-y-1">
            <p><strong>Last Updated:</strong> 20th November, 2025</p>
            <p><strong>Legal Entity:</strong> Vrober</p>
            <p><strong>Registered Address:</strong> Saketpuri, Ward No. 7, Godda, Jharkhand – 814133</p>
            <p><strong>Support Email:</strong> support@vrober.com</p>
            <p><strong>Support Number:</strong> +91 7903784438</p>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              These Terms & Conditions ("Terms") govern your use of the Vrober application, website, and related services ("Platform"). By using Vrober, you agree to be bound by these Terms.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definitions</h2>
            <div className="space-y-2 mb-6">
              <p><strong>"User" / "Customer"</strong> – Person booking a service.</p>
              <p><strong>"Vendor" / "Service Provider"</strong> – Skilled individual offering services via Vrober.</p>
              <p><strong>"Platform"</strong> – Vrober's app, website, dashboard & communication channels.</p>
              <p><strong>"Booking"</strong> – A confirmed service request.</p>
              <p><strong>"Service Fee"</strong> – Amount paid by user for the service.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Role</h2>
            <div className="space-y-2 mb-6">
              <p>Vrober is a service aggregator that connects users with independent vendors.</p>
              <p>Vrober does not employ vendors directly.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
            <p className="mb-2">Users agree to:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
              <li>Provide accurate personal information</li>
              <li>Maintain respectful behavior with vendors</li>
              <li>Ensure availability at the service location</li>
              <li>Not misuse, threaten, or engage in fraudulent bookings</li>
              <li>Pay applicable charges for cancellations or vendor visits</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vendor Obligations</h2>
            <p className="mb-2">Vendors must:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
              <li>Provide accurate details during onboarding</li>
              <li>Maintain professionalism and hygiene</li>
              <li>Reach on time for assigned bookings</li>
              <li>Not solicit Vrober customers privately</li>
              <li>Not cancel bookings without valid reason (penalty applicable)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing & Payments</h2>
            <div className="space-y-2 mb-6">
              <p>All prices are listed within the app.</p>
              <p>Vrober reserves the right to modify pricing anytime.</p>
              <p>Payments are processed securely via Cashfree.</p>
              <p>Vendor payouts occur every 3 days via UPI/Bank/Card.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation, Refund & Reschedule</h2>
            <div className="space-y-2 mb-6">
              <p>Governed strictly under separate policies.</p>
              <p>
                <Link href="/legal/cancellation-policy" className="text-blue-600 hover:text-blue-800 underline">
                  View Cancellation Policy
                </Link>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Commission & Charges</h2>
            <div className="space-y-2 mb-6">
              <p>Vrober charges vendors 20% to 30% commission per completed order.</p>
              <p>Minimum commission: ₹20 per order.</p>
              <p>Vendor cancellation penalty may apply.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Safety & Liability</h2>
            <div className="space-y-2 mb-6">
              <p>Vrober verifies vendors using Aadhaar + photo.</p>
              <p className="font-semibold">Vrober is not liable for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Misconduct by vendors</li>
                <li>Damage caused during service</li>
                <li>Loss of items during service</li>
              </ul>
              <p>Vrober may assist in disputes but is not responsible for direct losses.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
            <p className="mb-2">Vrober may suspend or terminate any account due to:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
              <li>Fraud</li>
              <li>Threatening behavior</li>
              <li>Policy violations</li>
              <li>Repeated cancellations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="mb-6">
              These Terms are governed by the Laws of India, including the IT Act 2000 and DPDP Act 2023.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> support@vrober.com</p>
              <p><strong>Phone:</strong> +91 7903784438</p>
              <p><strong>Address:</strong> Saketpuri, Ward No. 7, Godda, Jharkhand – 814133</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/legal/privacy-policy" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}