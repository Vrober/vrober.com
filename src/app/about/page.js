import {
  FiCheck,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiClock,
  FiSmile,
} from 'react-icons/fi';
import Link from 'next/link';

export const metadata = {
  title: 'About Vrober - Your Trusted Service Marketplace',
  description:
    'Vrober connects you with professional service providers. Quality, reliability, and convenience in one platform.',
};

export default function About() {
  const features = [
    {
      icon: FiShield,
      title: 'Verified Professionals',
      description:
        'All service providers are thoroughly vetted and verified for quality and reliability.',
    },
    {
      icon: FiClock,
      title: 'Easy Booking',
      description:
        'Book services in minutes with flexible scheduling options that work for you.',
    },
    {
      icon: FiSmile,
      title: 'Quality Assurance',
      description:
        'We ensure high-quality service delivery with customer satisfaction guarantees.',
    },
    {
      icon: FiTrendingUp,
      title: 'Growing Network',
      description:
        'Access to hundreds of professional service providers across multiple categories.',
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description:
        'Join thousands of satisfied customers who trust Vrober for their service needs.',
    },
    {
      icon: FiCheck,
      title: 'Transparent Pricing',
      description:
        "No hidden charges. Know exactly what you're paying for upfront.",
    },
  ];

  const values = [
    {
      title: 'Trust',
      description:
        'Building trust between customers and service providers through transparency and accountability.',
    },
    {
      title: 'Quality',
      description:
        'Maintaining high standards in service delivery and customer experience.',
    },
    {
      title: 'Accessibility',
      description:
        'Making professional services accessible and affordable for everyone.',
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our platform to serve you better.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="from-primary-600 to-primary-700 bg-gradient-to-r py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              About Vrober
            </h1>
            <p className="text-primary-100 mb-6 text-lg md:text-xl">
              Connecting You with Professional Service Providers You Can Trust
            </p>
            <p className="text-primary-100 mx-auto max-w-2xl">
              Vrober is your go-to marketplace for quality services. Whether you
              need cleaning, salons, repairs, or other professional services, we
              make it easy to find, book, and pay for trusted providers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                To revolutionize the service industry by creating a seamless,
                trustworthy platform that connects customers with qualified
                professionals. We empower service providers to grow their
                business while giving customers access to reliable, affordable
                services at their fingertips.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                To become the most trusted and user-friendly service marketplace
                in the region, where every customer can easily find quality
                services and every professional can build a thriving business.
                We envision a world where professional services are just one tap
                away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vrober */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Vrober?
            </h2>
            <p className="text-lg text-gray-600">
              We&apos;re committed to making professional services accessible
              and trustworthy
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
                >
                  <div className="bg-primary-100 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Icon className="text-primary-600 h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={index} className="border-primary-600 border-l-4 pl-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              How Vrober Works
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Browse Services
              </h3>
              <p className="text-gray-600">
                Explore hundreds of verified professionals across various
                service categories.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Book Your Service
              </h3>
              <p className="text-gray-600">
                Select your preferred provider, choose a time that works for
                you, and book instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Enjoy Quality Service
              </h3>
              <p className="text-gray-600">
                Receive professional service and share your feedback to help us
                improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-600 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold">10K+</div>
              <p className="text-primary-100">Happy Customers</p>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">500+</div>
              <p className="text-primary-100">Professional Providers</p>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">50K+</div>
              <p className="text-primary-100">Services Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to Book Your Service?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Join thousands of satisfied customers who trust Vrober for their
            service needs.
          </p>
          <Link
            href="/services"
            className="bg-primary-600 hover:bg-primary-700 inline-block rounded-lg px-8 py-3 font-semibold text-white transition"
          >
            Browse Services
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Get in Touch
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Have questions? We&apos;d love to hear from you!
          </p>
          <a
            href="/contact"
            className="text-primary-600 inline-block font-semibold hover:underline"
          >
            Contact Us →
          </a>
        </div>
      </section>
    </div>
  );
}
