import Link from 'next/link';

export const metadata = {
  title: 'Partner Agreement - Vrober',
  description: 'Service Partner Agreement terms for vendors and service providers on Vrober platform',
};

export default function PartnerAgreement() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Partner Agreement</h1>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              This Service Partner Agreement ("Agreement") is made between Vrober and the Service Partner who registers on the Vrober platform. By joining the Vrober platform, the Service Partner acknowledges and agrees to these terms.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Professional Service Quality</h2>
            <p className="mb-2">The Service Partner agrees to:</p>
            <ul className="list-disc list-inside space-y-1 mb-6">
              <li>Maintain high standards of professionalism, hygiene, and behavior</li>
              <li>Arrive on time for every booking</li>
              <li>Deliver services as described in the app</li>
              <li>Follow Vrober's pricing structure and service guidelines</li>
              <li>Not charge any extra amount outside the Vrober system</li>
              <li>Use safe tools, materials, and practices</li>
            </ul>
            <div className="p-4 bg-yellow-50 rounded-lg mb-6">
              <p className="text-yellow-800 font-medium">⚠️ Repeated complaints may result in suspension or permanent removal.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Commission & Earnings</h2>
            <div className="space-y-2 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Commission Structure</h3>
                  <ul className="space-y-1 text-green-700">
                    <li>• Platform commission: 20%–30%</li>
                    <li>• Minimum commission per job: ₹20</li>
                    <li>• Payout frequency: Every 3 days</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">Payment Options</h3>
                  <ul className="space-y-1 text-blue-700">
                    <li>• UPI Transfer</li>
                    <li>• Bank Transfer</li>
                    <li>• Card Settlement</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p>• Service Partners can track all earnings inside the app</p>
                <p>• Under no circumstance should a Service Partner demand cash outside Vrober</p>
                <p>• Vrober may adjust commission rates with prior notification</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellations & Penalties</h2>
            <div className="space-y-4 mb-6">
              <p>Service Partner must avoid unnecessary cancellations.</p>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-bold text-red-800 mb-2">Penalties apply for:</h3>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Cancelling a job after accepting it</li>
                  <li>Not reaching the customer after confirmation</li>
                  <li>Repeated delays or unprofessional conduct</li>
                </ul>
                <p className="mt-2 font-medium text-red-800">Multiple violations may lead to temporary suspension or permanent contract termination.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Code of Conduct</h2>
            <p className="mb-2">The Service Partner agrees to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Behave respectfully with customers and their families</li>
              <li>Not solicit customers privately outside the app</li>
              <li>Not exchange personal contact details for outside bookings</li>
              <li>Not consume alcohol or substances before or during service</li>
              <li>Not threaten, argue, or misbehave with customers</li>
            </ul>
            <div className="p-4 bg-red-50 rounded-lg mb-6">
              <p className="text-red-800 font-medium">🚨 Any misconduct will result in immediate removal.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Background Verification</h2>
            <div className="space-y-4 mb-6">
              <p>Service Partners must provide:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Required Documents</h3>
                  <ul className="space-y-1">
                    <li>✓ Aadhaar Card</li>
                    <li>✓ Profile Photo</li>
                    <li>✓ Bank Details</li>
                    <li>✓ Updated contact information</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">Additional Verification</h3>
                  <p className="text-blue-700">
                    May be requested for sensitive categories like home cleaning, salon, beauty, or technician-based services.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability</h2>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-bold text-orange-800 mb-2">Service Partners are fully responsible for:</h3>
                <ul className="list-disc list-inside space-y-1 text-orange-700">
                  <li>The quality of their workmanship</li>
                  <li>Damages caused due to negligence</li>
                  <li>Missing, lost, or broken items during service</li>
                  <li>Maintaining their own tools, cosmetics, or equipment</li>
                </ul>
              </div>
              <p className="italic text-gray-600">
                Vrober is an aggregator and is not liable for damages or losses caused by the Service Partner.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination of Contract</h2>
            <div className="space-y-4 mb-6">
              <p>Vrober may terminate this Agreement if:</p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Repeated cancellations occur</li>
                <li>Fraudulent or unethical activity is detected</li>
                <li>Customer complaints indicate consistent poor service</li>
                <li>Misconduct, verbal abuse, or unsafe behavior occurs</li>
                <li>Violation of platform rules continues after warnings</li>
              </ul>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-red-800 font-medium">⚠️ Termination may be immediate without notice in severe cases.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Acceptance</h2>
            <div className="p-6 bg-green-50 rounded-lg mb-6">
              <p className="text-green-800 font-medium">
                By onboarding, the Service Partner confirms they have read and understood this Agreement and voluntarily agree to all terms.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Ready to Join as a Service Partner?</h3>
            <p className="text-blue-800 mb-4">
              Start earning with Vrober today. Join thousands of service partners who trust our platform.
            </p>
            <Link 
              href="/vendor" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Become a Partner
            </Link>
          </div>

          {/* Contact Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions about Partnership?</h3>
            <div className="space-y-2">
              <p><strong>Email:</strong> support@vrober.com</p>
              <p><strong>Phone:</strong> +91 7903784438</p>
              <p><strong>Address:</strong> Saketpuri, Ward No. 7, Godda, Jharkhand – 814133</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/legal/privacy-policy" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Privacy Policy
            </Link>
            <Link 
              href="/legal/cancellation-policy" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              Cancellation Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}