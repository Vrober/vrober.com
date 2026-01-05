import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Vrober',
  description:
    'Privacy policy and data protection practices of Vrober platform',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <div className="space-y-1 text-gray-600">
            <p>
              <strong>Last Updated:</strong> 20th November, 2025
            </p>
            <p>
              <strong>Effective From:</strong> 20th November, 2025
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <p className="text-green-800">
              Vrober (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
              committed to protecting your privacy and ensuring that the
              personal information you share with us is handled responsibly.
              This Privacy Policy explains how we collect, use, store, and
              protect the information of both users and service providers
              (&quot;vendors&quot;) who access or use our platform.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="prose max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              1. Company Details
            </h2>
            <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-4">
              <p>
                <strong>Legal Name:</strong> Vrober
              </p>
              <p>
                <strong>Registered Address:</strong> Saketpuri, Ward No. 7,
                Godda, Jharkhand – 814133
              </p>
              <p>
                <strong>Support Email:</strong> support@vrober.com
              </p>
              <p>
                <strong>Support Phone:</strong> +91 7903784438
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              2. Information We Collect
            </h2>

            <h3 className="mb-3 text-xl font-bold text-gray-800">
              A. User Information
            </h3>
            <p className="mb-2">
              We collect the following information from customers who use the
              Vrober app or website:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Residential Address</li>
              <li>
                GPS/location data (to assign nearby vendors and track service
                progress)
              </li>
              <li>
                Photos uploaded by users (optional, for service-related
                purposes)
              </li>
              <li>
                Payment information (processed securely by Cashfree Payment
                Gateway)
              </li>
              <li>Order history, service preferences, and in-app activity</li>
            </ul>

            <h3 className="mb-3 text-xl font-bold text-gray-800">
              B. Vendor / Service Provider Information
            </h3>
            <p className="mb-2">To onboard and verify vendors, we collect:</p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Aadhaar card details</li>
              <li>Aadhaar photo & vendor profile photo</li>
              <li>Bank account information & UPI ID (for payouts)</li>
              <li>Live job location (for service tracking and safety)</li>
              <li>Service experience, category, and skills</li>
              <li>Availability and work radius</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              3. How We Use Your Information
            </h2>

            <h3 className="mb-3 text-xl font-bold text-gray-800">For Users:</h3>
            <ul className="mb-4 list-inside list-disc space-y-1">
              <li>To process bookings and assign verified service providers</li>
              <li>To send booking updates, notifications, and alerts</li>
              <li>To provide customer support and resolve disputes</li>
              <li>To enhance user experience and app performance</li>
              <li>
                To prevent fraud, ensure safety, and maintain platform integrity
              </li>
              <li>For internal analytics, improving service quality</li>
              <li>To communicate offers, promotions, and updates</li>
            </ul>

            <h3 className="mb-3 text-xl font-bold text-gray-800">
              For Vendors:
            </h3>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>To verify identity and eligibility</li>
              <li>To match vendors with nearby customer requests</li>
              <li>To calculate payments, commissions, and settlements</li>
              <li>To monitor service quality</li>
              <li>To ensure safety and accountability</li>
              <li>To communicate job-related notifications and updates</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              4. Technologies We Use
            </h2>
            <p className="mb-2">
              We use the following third-party tools & integrations:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>
                <strong>Cashfree Payment Gateway</strong> (secure payments)
              </li>
              <li>
                <strong>Google Maps / GPS</strong> (location tracking)
              </li>
              <li>
                <strong>Cloud Storage</strong> (secure data storage)
              </li>
              <li>
                <strong>Analytics Tools</strong> (app performance and user
                insights)
              </li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              5. Data Sharing and Disclosure
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                We do not sell, rent, or share your personal information with
                third parties except in the following circumstances:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>
                  With vendors (limited information to facilitate service
                  delivery)
                </li>
                <li>
                  With payment processors (for secure transaction processing)
                </li>
                <li>When required by law or legal proceedings</li>
                <li>To protect the safety and security of our users</li>
                <li>
                  In case of business transfer or merger (with prior notice)
                </li>
              </ul>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              6. Data Security
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure cloud infrastructure</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              7. Your Rights
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  data
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  data
                </li>
                <li>
                  <strong>Withdrawal:</strong> Withdraw consent for data
                  processing
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data
                </li>
              </ul>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              8. Data Retention
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our services</li>
              </ul>
              <p className="mt-2">
                After the retention period, we will securely delete or anonymize
                your data.
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              9. Changes to Privacy Policy
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes through:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>Email notifications</li>
                <li>In-app notifications</li>
                <li>Website updates</li>
              </ul>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              10. Contact Information
            </h2>
            <div className="mb-6 space-y-2">
              <p>
                For any questions or concerns about this Privacy Policy or our
                data practices, please contact us:
              </p>
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
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
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              href="/legal/terms-conditions"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Terms & Conditions
            </Link>
            <Link
              href="/legal/partner-agreement"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              Partner Agreement →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
