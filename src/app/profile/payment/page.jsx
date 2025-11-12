"use client";
export default function PaymentMethodsPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-semibold">Payment Methods</h1>
      <p className="text-sm text-zinc-600 mb-4">(Placeholder) Integrate saved cards / wallets here.</p>
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm text-zinc-500">No payment methods added yet.</p>
      </div>
    </div>
  );
}
