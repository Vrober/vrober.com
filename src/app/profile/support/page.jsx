'use client';
export default function SupportPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Help & Support</h1>
      <div className="max-w-lg space-y-4">
        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold">FAQs</h2>
          <p className="text-sm text-zinc-600">
            (Placeholder) Common questions will be listed here.
          </p>
        </section>
        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold">Contact Us</h2>
          <p className="text-sm text-zinc-600">
            Email: support@vrober.com (placeholder)
          </p>
        </section>
      </div>
    </div>
  );
}
