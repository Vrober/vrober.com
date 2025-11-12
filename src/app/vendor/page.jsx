export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-black">Vendor Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-600">Today&apos;s Orders</p>
            <p className="mt-1 text-2xl font-bold text-black">—</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="mt-1 text-2xl font-bold text-black">—</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="mt-1 text-2xl font-bold text-black">—</p>
          </div>
        </div>
        <p className="mt-8 text-gray-600">
          This is a starter skeleton for the vendor panel. We&apos;ll wire live metrics once vendor auth and data are ready.
        </p>
      </div>
    </div>
  );
}
