'use client';
export default function PrivacySecurityPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Privacy & Security</h1>
      <div className="max-w-lg space-y-4">
        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold">Data Usage</h2>
          <p className="text-sm text-zinc-600">
            (Placeholder) Explain how user data is stored and processed.
          </p>
        </section>
        <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold">Account Controls</h2>
          <p className="text-sm text-zinc-600">
            (Placeholder) Add options to deactivate or export data.
          </p>
        </section>
      </div>
    </div>
  );
}
